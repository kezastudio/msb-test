import React from 'react';

const formatDate = (timestamp: string | number | Date): string => {
    const messageDate = new Date(timestamp);
    const now = new Date();
    const timeDifference = now.getTime() - messageDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
    const isToday = now.toDateString() === messageDate.toDateString();
    const isYesterday = now.getTime() - messageDate.getTime() < oneDay && now.getDate() !== messageDate.getDate();
  
    if (isToday) {
      return `Today ${messageDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
    } else if (isYesterday) {
      return `Yesterday ${messageDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      return messageDate.toLocaleDateString('en-GB', options).replace(',', ' •');
    }
  };
  
  interface DateTimeComponentProps {
    timestamp: string | number | Date;
  }

const DateTimeComponent: React.FC<DateTimeComponentProps> = ({ timestamp }) => {
  return formatDate(timestamp)
    

};

export default DateTimeComponent;
