import React, { useEffect, useState } from "react";

import BasicDetails from "../forms/BasicDetails";
import Address from "../forms/Address";
import DocumentDetails from "../forms/DocumentDetails";
import PersonalDetails from "../forms/PersonalDetails";
// import SubmittedData from "../forms/SubmittedData";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, editRecord } from "../redux";
function JobForm() {
  let formData = useSelector((state) => {
    console.log(state, "state");
    return state.form.records;
  });

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const FormTitle = [
    "Basic Details",
    "Personal Details",
    "Address",
    "Document Details",
  ];

  const [moveNext, setMoveNext] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    lastname: "",
    firstname: "",
    dob: "",
    email: "",
    mobileno: "",
    physicalCard: "",
    aadhar: "",
    gender: "",
    fathername: "",
    aoc: "",
    village: "",
    streetname: "",
    pincode: "",
    proofofidentity: "",
    photo: "",
    pandate: "",
  });

  const pageDisplay = () => {
    if (page === 0) {
      return (
        <BasicDetails
          moveNext={moveNext}
          setMoveNext={setMoveNext}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      );
    } else if (page === 1) {
      return (
        <PersonalDetails
          moveNext={moveNext}
          setMoveNext={setMoveNext}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      );
    } else if (page === 2) {
      return (
        <Address
          moveNext={moveNext}
          setMoveNext={setMoveNext}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      );
    } else if (page === 3) {
      return (
        <DocumentDetails
          moveNext={moveNext}
          setMoveNext={setMoveNext}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      );
    }
    //  else {
    //   return (
    //     <SubmittedData formValues={formValues} setFormValues={setFormValues} />
    //   );
    // }
  };

  function validateForm(e) {
    e.preventDefault();
    let formData = e.target;
    let flag = 0;
    for (let i = 0; i < formData.length - 1; i++) {
      console.log(formData[i].value);
      flag = 0;
      if (formData[i].value === "") {
        flag = 1;
        break;
      }
    }

    if (flag === 1) {
      alert("*Plz fill all the fields");
    } else {
      setMoveNext(true);
    }

    if (page === 3) {
      if (formData) {
        // const retrivedata = JSON.parse(localStorage.getItem("values")) || [];
        if (id) {
          // for (const e in retrivedata) {
          //   if (parseInt(retrivedata[e].id) === parseInt(id)) {
          //     formValues["id"] = id;
          //     retrivedata[e] = formValues;
          //   }
          // }
          console.log(id, "id before called dispatch edit");
          dispatch(editRecord({ id: id, data: formValues }));
          // dispatch(deleteRecord({id:id,data:formValues}))
        } else {
          // const previd = retrivedata[retrivedata.length - 1].id;
          // formValues["id"] = parseInt(previd) + 1;
          // retrivedata.push(formValues);
          dispatch(addRecord(formValues));
        }
        // localStorage.setItem("values", JSON.stringify(retrivedata));
      } else {
        // formValues["id"] = 1;
        // localStorage.setItem("values", JSON.stringify([formValues]));
        // console.log("id found", id);
        dispatch(addRecord(formValues));
      }
      navigate("/tabledata");
    }
  }

  // -------------------------------------------------------------
  useEffect(() => {
    if (moveNext) {
      setPage((currentPage) => currentPage + 1);
    }
  }, [moveNext]);

  const retrivedata = JSON.parse(localStorage.getItem("values"));
  useEffect(() => {
    for (const e in retrivedata) {
      if (parseInt(retrivedata[e].id) === parseInt(id)) {
        setFormValues(retrivedata[e]);
        break;
      }
    }
  }, []);

  // console.log(page,"current page")x

  return (
    <>
      <br /> <br />
      {/* <form onSubmit={validateForm}> */}
      <form onSubmit={validateForm}>
        <h1>PAN Update Form</h1>
        <h2>{FormTitle[page]}</h2>
        {pageDisplay()} <br /> <br />
        <div>
          {page !== 0 && page <= 3 ? (
            <input
              type="button"
              value="Prev"
              id="prevButton"
              onClick={(e) => {
                setPage((currentPage) => currentPage - 1);
              }}
            />
          ) : null}

          {page < 3 ? (
            <input type="submit" value="Next" id="nextButton" />
          ) : page === 3 ? (
            <input type="submit" value="Submit" />
          ) : null}
        </div>
      </form>
      <div></div>
      <br /> <br />
      {/* <Link to='/home'>Go to home</Link> */}
    </>
  );
}

export default JobForm;
