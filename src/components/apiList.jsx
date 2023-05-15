/* Javier Suárez Guzmán
    Mayo 2023 */

import { React, useEffect, useState } from 'react';

const url = "https://localhost:7126/api/";
const apiList = async () => {
    const response = await fetch(url + "alumnos");
    //console.log(response);
    //console.log(response.status);

    const responseJSON = await response.json();
    //console.log(responseJSON);
}

export default apiList;