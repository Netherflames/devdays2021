const PART_SHEET = "1ABrvNJpAYCBJypq1EN3MBn3dCuqdpZPs-vj-qQlxeZA"
const PART_IND = 145607175
const PART_TEAM = 1460310197
const PART_FINAL = 51193248
const TEAM_SHEET = "1dxUqCGv7cJwWd3giYB85JHnCF43ohGyCULORD-y3EgE"
const TEAM_GID = 0

function fail_get_data() {

}

function get_sheet_data(sheet_id, gid, n) {
    
    return new Promise((resolve, reject) => {
        fetch(`https://docs.google.com/spreadsheets/u/2/d/${sheet_id}/gviz/tq?tqx=out:json&gid=${gid}`).then(
        function(r) {
            r.text()
            .then(
                function(d) {
                    //console.log("data =>", d);
                    const r = d.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
                    
                    if (!!r && r.length == 2) {
                        const obj = JSON.parse(r[1]);
                        const table = obj.table;
                        const header = table.cols.map(({label}) => label);
                        const rows = table.rows.map(({c}) => c.slice(0, n).map(( (x) => x && x.v || null )));

                        //console.log(header);
                        //console.log(rows);

                        resolve({h: header, r: rows});                        
                    }

                    reject()
                }
            )
            .catch(function(e) {
                // unable to fetch data
                reject();
            });
        }
    ).catch(function(e) {
        // unable to fetch data
        reject();
    })
    });    
}