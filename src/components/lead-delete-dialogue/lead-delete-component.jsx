/* eslint-disable no-restricted-imports */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { leadsSelector } from "../../store/leads/leads.selectors";
import { currentUserSelector } from "../../store/user/user.selectors"

import { useDispatch } from "react-redux";
import { fetchLeadsStart, fetchLeadsSuccess } from "../../store/leads/leads.action";

// import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function DeleteLeadDialogue({ show, onHide }) {

  const { clickedRow, pageNumber, offset } = useSelector(leadsSelector)
  const { accessToken } = useSelector(currentUserSelector)

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
      setIsLoading(false)
      console.log('delete:', response);
      // dispatch(fetchLeadsSuccess(response.data.leads))
      onHide();

      dispatch(fetchLeadsStart())
      axios.post('https://astra-crm.herokuapp.com/api/lead/get', {
        pageNumber,
        offset,
        searchFilters: {}
      }, {
        headers: {
          authorization: `${accessToken}`
        },
      }
      ).then((response) => {
        console.log(response);
        dispatch(fetchLeadsSuccess(response.data.leads))
      })
    }).catch(error => {
      setIsLoading(false)
      console.log(error.response)
    })

  }

  return (
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
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteLead}
            className="btn btn-danger btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
