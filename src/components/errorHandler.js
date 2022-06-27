import Swal from "sweetalert2";
// import { useHistory } from "react-router-dom";

export default function ErrorHandling(error) {
  console.log(error)
  const response = error?.response?.status;

  // let history = useHistory();
  // if(response===401){
  //   history.push("/logout");
  // }

  if (error == 'SuccessLeadUpdated') {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: 'Lead Updated SuccessFully!',
      customClass: {
        confirmButton: "btn btn-outline-danger btn-lg",
        icon: "text-danger border-danger"
      },
      buttonsStyling: false,
    });
  }
  else if (error == 'ErrorFailedToUpdateLead') {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Couldn't Update the lead try again!",
      customClass: {
        confirmButton: "btn btn-outline-danger btn-lg",
        icon: "text-danger border-danger"
      },
      buttonsStyling: false,
    });
  }
  else if (error == 'SuccessLeadDeleted') {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Lead Deleted SuccessFully!",
      customClass: {
        confirmButton: "btn btn-outline-danger btn-lg",
        icon: "text-danger border-danger"
      },
      buttonsStyling: false,
    });
  }
  else if (error == 'ErrorFailedToDeleteLead') {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Couldn't Delete the lead try again!",
      customClass: {
        confirmButton: "btn btn-outline-danger btn-lg",
        icon: "text-danger border-danger"
      },
      buttonsStyling: false,
    });
  }
  else if (response != 401) {
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