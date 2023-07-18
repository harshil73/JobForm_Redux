export const addRecord = (data) => {
  console.log(data, "data in add record");
  return {
    type: "ADD_RECORD",
    payload: {
      data: data,
    },
  };
};

export const editRecord = (data) => {
  console.log(data, "updated record");
  return {
    type: "EDIT_RECORD",
    payload: {
      data: data,
    },
  };
};

export const deleteRecord = (data) => {
  console.log("in the delete record action function", data);

  return {
    type: "DELETE_RECORD",
    payload: {
      data: data,
    },
  };
};
