import request from "@/endpoints/request";
import Link from "next/link";
import React from "react";
import { BsPen, BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Rootstate } from "@/redux/store";
import { useMutation } from "react-query";
import CheckModal from "./CheckModal";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

const Unit = ({
  id,
  name,
  course,
  idx,
  refreshData,
}: {
  id: string;
  name: string;
  course: string;
  idx: number;
  refreshData: () => void;
}) => {
  const { isAuthenticated, user, loading } = useSelector(
    (state: Rootstate) => state.userState
  );

  const deleteUnitResponse = useMutation(async () => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/units/${id}`,
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const editUnitResponse = useMutation(async (name: string) => {
    const token: string = localStorage.getItem("token") || "";
    const res = await request({
      url: `/api/units/${id}`,
      method: "patch",
      data: {
        name: name,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      return res.data;
    });

    return res;
  });

  const onDeleteUnit = () => {
    deleteUnitResponse.mutate();
  };

  const router = useRouter();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);

  const onEditModal = (name: string) => {
    editUnitResponse.mutate(name);
    setEditModal(false);
  };

  React.useEffect(() => {
    editUnitResponse.isSuccess && toast.success("Unit is created !");
    editUnitResponse.isSuccess && refreshData();
  }, [editUnitResponse.isSuccess]);

  React.useEffect(() => {
    deleteUnitResponse.isSuccess && toast.success("Unit is created !");
    deleteUnitResponse.isSuccess && refreshData();
  }, [deleteUnitResponse.isSuccess]);

  return (
    <>
      {editModal && (
        <Modal closeModal={() => setEditModal(false)} onSubmit={onEditModal} />
      )}
      {deleteModal && (
        <CheckModal
          closeModal={() => setDeleteModal(false)}
          onSubmit={() => {
            setDeleteModal(false);
            onDeleteUnit();
          }}
        />
      )}
      <div className="t-head w-full text-2xl border p-6 text-tsecondary font-bold flex justify-between md:flex-row flex-col gap-6">
        <span>
          Unit {idx} : {name}
        </span>
        {user.isAdmin && (
          <div className="group flex gap-4">
            <Link
              href={`${router.asPath}/unit/${id}`}
              className="btn-primary text-sm"
            >
              Add lesson
            </Link>

            <div
              className="btn-secondary text-sm  flex items-center gap-1"
              onClick={() => setEditModal(true)}
            >
              Edit <BsPen />
            </div>

            <div
              onClick={() => setDeleteModal(true)}
              className="btn-primary text-sm  flex items-center gap-1 bg-danger border-danger"
            >
              Delete <BsTrash />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Unit;
