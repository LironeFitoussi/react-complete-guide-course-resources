import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

// Import the fetchEvent function
import { fetchEvent } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isPending, isError, error} = useQuery({
    queryKey: ['events', { id }],
    queryFn: ({signal}) => fetchEvent({signal, id}),
  });

  function handleSubmit(formData) {}

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    )
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock 
          title="Failed to load event" 
          message={error.message?.info || 
          'Failed to load event, please check your inputs and try again later'} />
        <div className='form-actions'>
          <Link to="../" className='button'> Okay </Link>
        </div>
      </>
    )
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }


  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
