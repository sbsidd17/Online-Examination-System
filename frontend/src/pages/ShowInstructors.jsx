/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FcApproval, FcCancel, FcOk, FcInfo } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  approveInstructor,
  getAllInstructors,
  unapproveInstructor,
} from "../redux/slices/adminSlice";

function ShowInstructors() {
  const dispatch = useDispatch();
  const { allInstructors } = useSelector((state) => state.admin);

  async function getData() {
    await dispatch(getAllInstructors());
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <table className="w-full border-separate border-spacing-2 border bg-white">
        <thead className="bg-slate-300 font-semibold">
          <tr>
            <td>S.N.</td>
            <td>Name</td>
            <td>Email</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {allInstructors?.map((instructor, index) => {
            return (
              <tr key={instructor._id}>
                <td>{index + 1}</td>
                <td>
                  {instructor.first_name} {instructor.last_name}
                </td>
                <td>{instructor.email}</td>
                <td>
                  {instructor.approved ? (
                    <div className="flex justify-start items-center gap-2 rounded-sm">
                      <FcApproval size={28} />
                      Approved
                    </div>
                  ) : (
                    <div className="flex justify-start items-center gap-2 rounded-sm">
                      <FcInfo size={28} />
                      Pending
                    </div>
                  )}
                </td>
                <td>
                  {instructor.approved ? (
                    <button
                      onClick={() => {
                        dispatch(unapproveInstructor(instructor._id));
                        getData();
                      }}
                      className="flex justify-start items-center gap-2 rounded-md bg-red-200 hover:bg-red-300 p-1"
                    >
                      <FcCancel size={28} />
                      UpApprove
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(approveInstructor(instructor._id));
                        getData();
                      }}
                      className="flex justify-start items-center gap-2 rounded-md bg-green-200 hover:bg-green-300 p-1"
                    >
                      <FcOk size={28} />
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShowInstructors;
