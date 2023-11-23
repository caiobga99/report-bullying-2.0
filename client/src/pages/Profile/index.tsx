import { useEffect } from "react";
import ReportCard from "../../components/ReportCard";
import api from "../../lib/api";
const Profile = () => {
  useEffect(() => {
    // api.get("/logout");
    // api.get("/token").then((res) => {
    //   setToken(res.data);
    // });
    api.get("/sanctum/csrf-cookie").then((response) => {
      api.get("/userIsLogged").then((res) => {
        console.log(res.data + " dado");
      });
    });
  }, []);
  return (
    <div className="container mx-auto py-4 flex flex-wrap gap-4 items-center justify-center">
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
      <ReportCard />
    </div>
  );
};

export default Profile;
