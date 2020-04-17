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
          name: "MH res 1",
          details: "This is a description of a service", 
          email: ["email1@email.com", "email2@email2.com"],
          phone: ["123456789"],
        }, 
        {
          id: '2',
          name: "Resource 2",
          details: "This is the full text for Commander's Call",
          email: ["email1@email.com", "email2@email2.com"],
          phone: ["123456789"],
        },
        {
          id: '3',
          name: "Resource 3",
          details: "This is the full text for Data Burst",
          email: ["email1@email.com", "email2@email2.com"],
          phone: ["123456789"],
        },
      ],
    }, 
    {
      id: '2',
      title: "Sexual Assault",
      resources: [
        {
          id: '1',
          name: "SA res 1",
          details: "This is the full text for Data Burst",
          email: ["email1@email.com", "email2@email2.com"],
          phone: ["123456789"],        }, 
        {
          id: '2',
          name: "SA res 2",
          details: "This is the full text for Data Burst",
          email: ["email1@email.com", "email2@email2.com"],
          phone: ["123456789"],        },
        {
          id: '3',
          name: "Resource 3",
          details: "This is the full text for Data Burst",
          email: ["email1@email.com", "email2@email2.com"],
          phone: ["123456789"],        },
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

  