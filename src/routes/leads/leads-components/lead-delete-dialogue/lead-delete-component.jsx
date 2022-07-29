/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { leadsSelector } from "../../../../store/leads/leads.selectors";
import { currentUserSelector } from "../../../../store/user/user.selectors"

import ErrorHandling from "../../../../components/errorHandler";

import { useDispatch } from "react-redux";
import { fetchLeadsStart, fetchLeadsSuccess, setLeadsDeleteError, setLeadsSuccessFullyDeleted } from "../../../../store/leads/leads.action";
import Alert from '@mui/material/Alert';


// import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function DeleteLeadDialogue({ show, onHide, reRender, setReRender, newLeadReRender, setNewLeadReRender, followLeadReRender, setFollowLeadReRender }) {

  const { clickedRow, pageNumber, offset, successfullyDeleted } = useSelector(leadsSelector)
  const { accessToken } = useSelector(currentUserSelector)
  const [isError, setIsError] = useState(false)


  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()



  const deleteLead = async () => {

    setIsLoading(true)
    axios.delete(`https://astra-crm.herokuapp.com/api/lead/delete/${clickedRow._id}`, {
      headers: {
        authorization: `${accessToken}`
      },
    }
    ).then((response) => {
      ErrorHandling('SuccessLeadDeleted')
      setIsLoading(false)
      console.log('delete:', response);
      onHide();

      if (reRender !== undefined) {
        setReRender(!reRender)
      } else if (newLeadReRender !== undefined) {
        setNewLeadReRender(!newLeadReRender)
      } else if (followLeadReRender !== undefined) {
        setFollowLeadReRender(!followLeadReRender)
      }
    }).catch(error => {
      // dispatch(setLeadsDeleteError(true))
      ErrorHandling('ErrorFailedToDeleteLead')
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
            <span>Are you sure to permanently delete this Lead?</span>
          )}
          {isLoading && <span>Lead is deleting...</span>}
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
              onClick={deleteLead}
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
