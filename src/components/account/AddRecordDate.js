import React, { useState, useCallback } from 'react';
import { Calendar } from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';

export default function AddRecordDate({date, onChangeDate}) {
  const onChange= (val) => {
    console.log(val)
    onChangeDate(val);
  }
  return (
    <div style={{width: "50%"}}>
      <Calendar value={date} onChange={onChange}/>
    </div>
  );
}