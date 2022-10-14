import { configureStore } from '@reduxjs/toolkit'
import {calendarReducer1, calendarReducer2} from "./slices/calendar.slice"
import { selectReducer1, selectReducer2, } from "./slices/select.slice"
import { modalReducer1, modalReducer2, modalReducer3 } from "./slices/modal.slice"
import langReducer from "./slices/lang.slice"
import themeReducer from "./slices/theme.slice"
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import newEmployeeReducer from "./slices/employee.slice";
import allEmployeesReducer from "./slices/getAllEmployees.slice"
import delEmployeeReducer from "./slices/deleteEmployee.slice"
import statesReducer from "./slices/states.slice"
import departmentsReducer from "./slices/departments.slice"
import uploadFileReducer from "./slices/file.slice"
import editEmployeeReducer from "./slices/editEmployee.slice"

const reducer = {
  calendarReducer1: calendarReducer1,
  calendarReducer2: calendarReducer2,
  selectReducer1: selectReducer1,
  selectReducer2: selectReducer2,
  modal1: modalReducer1,
  modal2: modalReducer2,
  modal3: modalReducer3,
  lang: langReducer,
  theme: themeReducer,
  auth: authReducer,
  message: messageReducer,
  newEmployee: newEmployeeReducer,
  allEmployees: allEmployeesReducer,
  delEmployee: delEmployeeReducer,
  states: statesReducer,
  departments: departmentsReducer,
  uploadFile: uploadFileReducer,
  editEmployee: editEmployeeReducer

  
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;