<template>
  <table class="mt-8">
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
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  overflow: hidden;
}
tbody{
  background: transparent;
  color: white;
}
th,
td {
  padding: 16px;
  text-align: left;
}
th {
  background-color: #1A1919;
  color: #FFF;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
}
tr{
  transition: 0.3s;
}
tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.15);
}
tr:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>