var ind_dt;
var team_dt;
var final_dt;
var loading = false;

function show_ind() {
    if (loading) {
        alert("Wait for previous process to finish loading.");
        return;
    }

    loading = true;
    Cookies.set("part_type", "ind");
    $(".nav-items").removeClass("active");
    $("#ind").addClass("active");
    
    $("#spinner").show();
    $("#member-table-wrapper, #team-table-wrapper, #final-table-wrapper, #error").hide();

    get_sheet_data(PART_SHEET, PART_IND, 4).then((r) => {
        r = r.r //.map((x) => {x.splice(2, 1); return x});
        
        $("#member-table-wrapper").show();
        if (ind_dt) {
            ind_dt.data().clear();
            ind_dt.clear();
            ind_dt.rows.add(r).draw();
            return;
        } else {
            ind_dt = $("#member-table").DataTable(
                {
                    data: r,
                    fixedHeader: true,
                    order: [[0, 'asc']],
                    deferRender: true
                }
            );
            ind_dt.draw();
        }

    }).catch(
        (e) => {
            $("#member-table-wrapper, #team-table-wrapper, #final-table-wrapper").hide();
            $("#error").show();
        }
    ).then(
        () => {
            loading = false;
            $("#spinner").attr("style", 'display: none !important')
        }
    );
}

function show_team() {
    if (loading) {
        alert("Wait for previous process to finish loading.");
        return;
    }

    loading = true;
    $(".nav-items").removeClass("active");
    $("#team").addClass("active");
    Cookies.set("part_type", "team");
    
    $("#spinner").show();
    $("#member-table-wrapper, #team-table-wrapper, #final-table-wrapper, #error").hide();

    get_sheet_data(PART_SHEET, PART_TEAM, 5).then((r) => {
        r = r.r //.map((x) => {x.splice(3, 1); return x});
        
        $("#team-table-wrapper").show();
        if (team_dt) {
            team_dt.data().clear();
            team_dt.clear();
            team_dt.rows.add(r).draw();
            return;
        } else {
            team_dt = $("#team-table").DataTable(
                {
                    data: r,
                    fixedHeader: true,
                    order: [[0, 'asc']],
                    deferRender: true
                }
            );
            team_dt.draw();
        }

    }).catch(
        (e) => {
            $("#member-table-wrapper, #team-table-wrapper, #final-table-wrapper").hide();
            $("#error").show();
        }
    ).then(
        () => {
            loading = false;
            $("#spinner").attr("style", 'display: none !important')
        }
    );
}

$(document).ready(() => {
    if (!Cookies.get("part_type")) {
        Cookies.set("part_type", "ind");
    }
    
    cur_page = Cookies.get("part_type");

    switch(cur_page) {        
        case "team":
            show_team();
            break;
        
        case "final":
            show_final();
            break;
        
        case "ind":
        default:
            show_ind();
            break;
    }
})