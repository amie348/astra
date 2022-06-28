/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { usersSelector } from "../../../../store/users/users.selectors";
import { currentUserSelector } from "../../../../store/user/user.selectors"

import ErrorHandling from "../../../../components/errorHandler";

import { useDispatch } from "react-redux";
import { fetchUsersStart, fetchUsersSuccess, setUsersRawData } from "../../../../store/users/users.action";

export function DeleteUserDialogue({ show, onHide }) {

  const { usersPageNumber, usersOffset, usersClickedRow } = useSelector(usersSelector)
  const { accessToken } = useSelector(currentUserSelector)

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()

  const deleteUser = async () => {

    setIsLoading(true)
    axios.delete(`https://astra-crm.herokuapp.com/api/user/delete/${usersClickedRow._id}`, {
      headers: {
        authorization: `${accessToken}`
      },
    }
    ).then((response) => {
      ErrorHandling('SuccessUserDeleted')
      setIsLoading(false)
      onHide();

      dispatch(fetchUsersStart())
      axios.post('https://astra-crm.herokuapp.com/api/lead/get', {
        pageNumber: usersPageNumber,
        offset: usersOffset,
        searchFilters: {}
      }, {
        headers: {
          authorization: `${accessToken}`
        },
      }
      ).then((response) => {
        console.log(response);
        dispatch(fetchUsersSuccess(response.data.leads))
        dispatch(setUsersRawData(response.data))
      })
    }).catch(error => {
      ErrorHandling('ErrorFailedToDeleteUser')
      onHide()
      setIsLoading(false)
      console.log(error.response)
    })

  }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        {/* {isLoading && <ModalProgressBar variant="query" />} */}
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Lead Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoading && (
            <span>Are you sure to permanently delete this User?</span>
          )}
          {isLoading && <span>User is deleting...</span>}
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              type="button"
              onClick={onHide}
              className="btn btn-light btn-elevate"
              disabled={isLoading}
            >
              Cancel
            </button>
            <> </>
            <button
              style={{ minWidth: '70px' }}
              type="button"
              onClick={deleteUser}
              className="btn btn-danger btn-elevate"
              disabled={isLoading}
            >
              {isLoading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                <span className="sr-only"></span>
              </div> : 'Delete'}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
