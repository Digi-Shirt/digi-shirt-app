/**
 * This is mock placeholder news data
 */
 //import * as React from 'react';


 export default () => {
     return(resourceCategories);
 };

 const resourceCategories = [
    {
      id: '1',
      title: "Mental Health",
      resources: [
        {
          id: '1',
          title: "MH res 1",
          article: "Some details about Resource 1. \n Maybe a contact number \n and an email"
        }, 
        {
          id: '2',
          title: "Resource 2",
          article: "This is the full text for Commander's Call"
        },
        {
          id: '3',
          title: "Resource 3",
          article: "This is the full text for Data Burst"
        },
      ],
    }, 
    {
      id: '2',
      title: "Sexual Assault",
      resources: [
        {
          id: '1',
          title: "SA res 1",
          article: "Some details about Resource 1. \n Maybe a contact number \n and an email"
        }, 
        {
          id: '2',
          title: "SA res 2",
          article: "This is the full text for Commander's Call"
        },
        {
          id: '3',
          title: "Resource 3",
          article: "This is the full text for Data Burst"
        },
      ],
    },
    {
      id: '3',
      title: "Finance",
    },
    {
      id: '4',
      title: "Career Development",
    },
    {
      id: '5',
      title: "Other",
    },
  ];

  