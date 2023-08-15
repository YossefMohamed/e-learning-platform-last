import Modal from "@/components/Modal";
import React from "react";
import request from "@/endpoints/request";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Rootstate } from "@/redux/store";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import Unit from "@/components/Unit";
import Lesson from "@/components/Lesson";

function Year() {
  const { isAuthenticated, user, loading } = useSelector(
    (state: Rootstate) => state.userState
  );

  const router = useRouter();

  const lessonsResponse = useQuery(
    "lessons",
    async () => {
      const res = await request({
        url: `/api/lessons/${router.query.course}`,
        method: "get",
      }).then((res) => {
        return res.data;
      });

      return res;
    },
    {
      enabled: false,
    }
  );

  const [modal, setModal] = React.useState(false);

  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  const course = `${router.query.course}`;
  const unitsResponse = useQuery(
    "units",
    async () => {
      const res = await request({
        url: `/api/units/${router.query.course}`,
        method: "get",
      }).then((res) => {
        return res.data;
      });

      return res;
    },
    {
      enabled: false,
    }
  );

  const createUnitResponse = useMutation(async (data: any) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/units/`,
      method: "post",
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const onCreateUnit = (name: string) => {
    !createUnitResponse.isLoading &&
      createUnitResponse.mutate({
        name,
        course,
      });
    createUnitResponse.isLoading && toast.loading("Loading....");
  };

  React.useEffect(() => {
    createUnitResponse.isError &&
      toast.error(createUnitResponse.error as string);
    createUnitResponse.isSuccess && toast.success("Unit is created !");
    createUnitResponse.isSuccess && unitsResponse.refetch();
    createUnitResponse.isSuccess && closeModal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createUnitResponse.isError,
    createUnitResponse.isSuccess,
    createUnitResponse.error,
  ]);

  React.useEffect(() => {
    if (router.isReady) {
      if (
        user.course !== router.query.course &&
        user.year !== router.query.year &&
        !user.isAdmin
      ) {
        toast.error("You are not a participant in this course");
        router.push(`/years`);
      } else {
        unitsResponse.refetch();
        lessonsResponse.refetch();
      }
    }
  }, [
    user,
    isAuthenticated,
    router.query,
    router,
    unitsResponse,
    lessonsResponse,
  ]);

  return (
    <div className="p-10 relative min-h-screen">
      {modal && (
        <div className="absolute top-0">
          <Modal closeModal={closeModal} onSubmit={onCreateUnit} />
        </div>
      )}

      <div className="sec-title w-fit">Course Details</div>

      {unitsResponse.isLoading && lessonsResponse.isLoading ? (
        <Spinner />
      ) : (
        <div className="table  w-full">
          {unitsResponse.data?.map(
            ({ name, id }: { name: string; id: string }, idx: number) => {
              let lessons: any = [];
              lessonsResponse.data?.map((lesson: any) => {
                if (lesson.unit.id === id) lessons.push(lesson);
              });
              return (
                <div key={id}>
                  <Unit
                    id={id}
                    name={name}
                    key={id}
                    idx={idx + 1}
                    course={course}
                    refreshData={unitsResponse.refetch}
                  />
                  {lessons.map((lesson: any) => (
                    <Lesson
                      name={lesson.name}
                      id={lesson._id}
                      key={lesson._id}
                    />
                  ))}
                </div>
              );
            }
          )}

          <div className="t-head w-full text-2xl border p-6 text-tsecondary font-bold flex justify-between md:flex-row flex-col gap-6">
            <span>Add new unit</span>
            <span className="btn-primary text-sm" onClick={openModal}>
              Add Unit
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Year;
