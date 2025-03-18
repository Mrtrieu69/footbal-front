<template>
  <table>
    <thead>
    <tr>
      <th colspan="2">Statistics</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Maximum speed</td>
      <td>34.08 km/h</td>
    </tr>
    <tr>
      <td>Minimum speed</td>
      <td>3.92 km/h</td>
    </tr>
    <tr>
      <td>Maximum running distance</td>
      <td>102.23 m</td>
    </tr>
    <tr>
      <td>Minimum running distance</td>
      <td>23.51 m</td>
    </tr>
    <tr>
      <td>Team 1's ball possession percentage</td>
      <td>94.63 %</td>
    </tr>
    <tr>
      <td>Team 2's ball possession percentage</td>
      <td>5.37 %</td>
    </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>

table {
  width: 56%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}
tbody{
  background: #2c2c2c;
  color: white;
}
th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #00ffcc;
}
th {
  background-color: #00ffcc;
  font-weight: bold;
}
tr{
  transition: 0.3s;
}
tr:nth-child(even) {
  background-color: #101010;
}
tr:hover {
  background-color: #454545;
}
</style>