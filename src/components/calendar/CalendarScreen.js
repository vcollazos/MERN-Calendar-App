import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';




// pongo el moment en español para ver los días
moment.locale('es');

const localizer = momentLocalizer(moment);



export const CalendarScreen = () => {

  const dispatch = useDispatch();
  // TODO: leer del store, los eventos
  const { events, activeEvent } = useSelector( state => state.calendar);
  const { uid } = useSelector( state => state.auth );

  // mantiene el estado cuando recargamos
  const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' );

  useEffect(() => {
    dispatch( eventStartLoading() ); 

  }, [ dispatch ])

  // función para editar con doble clic un evento
  const onDoubleClic = (e) => {
      // console.log(e);
      dispatch( uiOpenModal() );
  }

  // función que al hacer un clic podemos, eliminar...etc
  const onSelectEvent = (e) => {
    dispatch( eventSetActive( e ));   
  }

  // función para saber en que lugar estamos del calendario
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    dispatch( eventClearActiveEvent() );
  }


  const eventStyleGetter = ( event, start, end, isSelected ) => {

      const style = {
        backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#FF7533',
        borderRadius: '0px',
        color: 'white',
        opacity: 0.8,
        display: 'block',
      }

      return {
          style
      }
  };

  return (
    <div className='calendar-screen'>
       <Navbar />

        <Calendar
            localizer={ localizer }
            events={ events }
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={ eventStyleGetter }
            onDoubleClickEvent={onDoubleClic}
            onSelectEvent={ onSelectEvent }
            onView={ onViewChange }
            onSelectSlot={ onSelectSlot }
            selectable={ true }
            view={ lastView }
            components={{
              event: CalendarEvent
            }}
        />

        <AddNewFab />

        {
          (activeEvent) && <DeleteEventFab />
        }
       

        <CalendarModal />

        

    </div>
  )
}


