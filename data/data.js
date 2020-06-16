module.exports = {
  tableData: [
    {
      id: 1,
      name: "A",
      username: "AA",
      address: "Atambua"
    },
    {
      id: 2,
      name: "B",
      username: "BB",
      address: "Bandung"
    },
    {
      id: 3,
      name: "C",
      username: "CC",
      address: "Cilacap"
    },
    {
      id: 4,
      name: "D",
      username: "DD",
      address: "Denpasar"
    },
    {
      id: 5,
      name: "E",
      username: "EE",
      address: "Ende"
    },
    {
      id: 6,
      name: "F",
      username: "FF",
      address: "Bogor"
    },
    {
      id: 7,
      name: "G",
      username: "GG",
      address: "Garut"
    },
    {
      id: 8,
      name: "H",
      username: "HH",
      address: "Emen"
    },
    {
      id: 9,
      name: "I",
      username: "II",
      address: "Indramayu"
    },
    {
      id: 10,
      name: "J",
      username: "JJ",
      address: "Jakarta"
    }
  ],
  columns: [
    {
      field: "selection",
      width: 100,
      titleAlign: "center",
      columnAlign: "center",
      type: "selection",
      isResize: true
    },
    {
      field: "name",
      title: "Name",
      orderBy: "asc",
      width: 150,
      formatter: function(rowData) {
        // console.log(rowData,rowIndex,pagingIndex,field, "name");
        return `<div class="showDetailByName">${rowData.name}</div>`;
      },
      titleAlign: "center",
      columnAlign: "center",
      isResize: true
    },
    {
      field: "username",
      title: "Username",
      orderBy: "asc",
      width: 200,
      formatter: function(rowData) {
        // console.log(rowData, rowIndex, pagingIndex, field, "username");
        return `<div class="showDetailByUsername">${rowData.username}</div>`;
      },
      titleAlign: "center",
      columnAlign: "center",
      isResize: true
    },
    {
      field: "address",
      title: "Address",
      width: 300,
      titleAlign: "center",
      columnAlign: "center",
      isResize: true
    },
    {
      field: "operations",
      title: "Operations",
      width: 150,
      titleAlign: "center",
      columnAlign: "center",
      // componentName: "TableOperation",
      formatter: function() {
        // console.log(rowData, rowIndex, pagingIndex, field);
        return `<span>
          <button class="update">Update</button> &nbsp;
          <button class="delete">Delete</button>
        </span>`;
      },
      isResize: true
    }
  ]
};
