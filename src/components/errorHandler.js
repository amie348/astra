import Swal from "sweetalert2";
// import { useHistory } from "react-router-dom";

export default function ErrorHandling(error) {
  console.log(error)
  const response = error?.response?.status;

  // let history = useHistory();
  // if(response===401){
  //   history.push("/logout");
  // }

  if (response != 401) {
    Swal.fire({
      icon: "error",
      title: "Sorry!",
      text:
        response === 400
          ? "Invalid input"
          : // : response === 401
          // ? "Session expired please login again"
          response === 403
          ? "User valid but not authorized to access the resource"
          : response === 404
          ? "Not found"
          : response === 500 || response > 500
          ? "Something went wrong"
          : response === 409
          ? "User already exist"
          : "Connection Problem With Server",

      // confirmButtonColor: "#023cc5",
      customClass: {
        confirmButton: "btn btn-outline-danger btn-lg",
        icon: "text-danger border-danger"
      },
      buttonsStyling: false,
    });
  }
}