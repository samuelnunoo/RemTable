function nameMap(columns) {
    const map = new Map();
    columns.forEach(item => {
        const id = item._id;
        const name = item.name[0];
        map.set(id, name);
    });
    return map;
}
function getRowColumn(row, columns) {
    const columnNames = nameMap(columns);
    row.name[0]._id;
}

async function getTemplate(name) {
    return await RemNoteAPI.v0.get_by_name(name);
}
function formatChildren(item) {
    if (item[0][0] == undefined)
        return;
    const name = item[0][0];
}
function formatData(columns, rows) {
    const map = nameMap(columns);

    const newrows = rows.map(item => {
        const data = {};
        for (let i = 0; i < item.length; i++) {
            if (i == 0 && item[0][0])
                data["name"] = item[0][0];
            else {
                const namez = item[i].name ? item[i].name[0]._id : undefined;
                const colName = map.get(namez);
                if (colName && item[i].content)
                    data[colName] = item[i].content[0];

            }
        }
        return data;

    });
    return newrows;


}

async function getColumns(data) {
    const promises = data.children.map(async (id) => await getRem(id));
    const newdata = await Promise.all(promises);
    return newdata.filter(item => item.remType === "slot");
}

async function resolve(data) {
    return await Promise.all(data);
}

async function getRowChildren(data) {
    const promises = data.map(async (item) => {
        const children = await resolve(item.children.map(async (child) => getRem(child)));
        return [item.name, ...children];
    });
    const newdata = await Promise.all(promises);
    return newdata;
}

async function getRows(data) {
    const newdata = await resolve(data.tagChildren.map(async (id) => await getRem(id)));
    const filtered = newdata.filter(item => item.remType !== "no_content");
    const complete = await getRowChildren(filtered);
    return complete;

}

async function getData(template) {
    const data = await getTemplate(template);
    const columns = await getColumns(data);
    const rows = await getRows(data);
    const table = formatData(columns, rows);
    const columnData = setupColumns(columns);

    return { data: table, columns: columnData };
}
function setupColumns(columns) {
    const filtered = columns.filter(x => x.name[0] !== undefined);
    const data = filtered.map(item => {
        const name = item.name[0];
        return { title: name, field: name };
    });
    return data;

}

async function setupTable(template) {
    const { data, columns } = await getData(template);

    const table = new Tabulator("#example", {
        height: 205,
        data,
        layout: "fitColumns",
        tooltips: true,
        movableColumns: true,
        resizableRows: true,
        columns: [{ title: "Name", field: "name" }, ...columns]
    });
}
