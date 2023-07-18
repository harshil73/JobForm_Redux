const initialData = {
  records: JSON.parse(localStorage.getItem("values")) || [],
};

export const formReducer = (state = initialData, action) => {
  // console.log(state,"state data")
  switch (action.type) {
    case "ADD_RECORD":
      let retrivedata = state.records;
      let formValues = action.payload.data;
      console.log(action.payload, "form form reducer payload.....");

      if (
        state.records !== undefined &&
        state.records !== null &&
        state.records.length > 0
      ) {
        const previd = retrivedata[retrivedata.length - 1].id;
        formValues["id"] = parseInt(previd) + 1;
        retrivedata.push(formValues);
        console.log(retrivedata.push(formValues));
      } else {
        formValues["id"] = 1;
        retrivedata.push(formValues);
      }

      console.log(formValues, "formvalues data in form reducer");
      console.log(retrivedata, "retrive data in form reducer");

      return {
        // ...state,
        records: retrivedata,
      };

    case "EDIT_RECORD":
      let retriveData = state.records;
      for (const e in retriveData) {
        if (parseInt(retriveData[e].id) === parseInt(action.payload.data.id)) {
          action.payload.data.data["id"] = action.payload.data.id;
          retriveData[e] = action.payload.data.data;
        }
      }
      console.log(retriveData, "in edit record reducer");
      return {
        ...state,
        records: retriveData,
      };

    case "DELETE_RECORD":
      let data = action.payload.data;
      // console.log(data.id, "id which we want to delete");
      let alldata = state.records;
      const remainingData = alldata.filter((records) => {
        return records.id !== data.id;
      });
      // console.log(remainingData, "remainingData");
      return {
        ...state,
        records: remainingData,
      };

    default:
      return state;
  }
};
