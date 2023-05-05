import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Rootstate } from "@/redux/store";
import { useSelector } from "react-redux";

const useCheckPart = () => {
  const { isAuthenticated, user } = useSelector(
    (state: Rootstate) => state.userState
  );
  const [loading, setLoading] = React.useState(false);
  const [part, setPart] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (
      user.course !== router.query.course &&
      user.year !== router.query.year &&
      !user.isAdmin
    ) {
      toast.error("You are not a participant in this course");
    }
    if (!isAuthenticated) router.push("/login");
  }, [user, isAuthenticated, router.query]);

  return [loading, part];
};

export default useCheckPart;
