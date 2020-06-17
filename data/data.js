module.exports = {
  tableData: [
    {
      id: 1,
      name: "Albert",
      username: "alberto",
      address: "Atambua"
    },
    {
      id: 2,
      name: "Barron",
      username: "barronese",
      address: "Bandung"
    },
    {
      id: 3,
      name: "Charlie",
      username: "charliecc",
      address: "Cilacap"
    },
    {
      id: 4,
      name: "Dermount",
      username: "derunmount",
      address: "Denpasar"
    },
    {
      id: 5,
      name: "Eagle",
      username: "eaglers",
      address: "Ende"
    },
    {
      id: 6,
      name: "France",
      username: "francest",
      address: "Bogor"
    },
    {
      id: 7,
      name: "George",
      username: "georgy",
      address: "Garut"
    },
    {
      id: 8,
      name: "Hayley",
      username: "hyly",
      address: "Emen"
    },
    {
      id: 9,
      name: "Iguana",
      username: "iguanax",
      address: "Indramayu"
    },
    {
      id: 10,
      name: "James",
      username: "jamesjon",
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
          <button class="updateBtn">Update</button> &nbsp;
          <button class="deleteBtn">Delete</button>
        </span>`;
      },
      isResize: true
    }
  ]
};
