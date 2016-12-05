'use strict';

import React from 'react';

const TableRow = (num, i) => (
  <tr key={i}>
    <td>
      {i + 1}
    </td>
    <td>
      {num}
    </td>
  </tr>
);

export default TableRow;
