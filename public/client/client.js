$(document).ready(function() {

    $('#add_courses').on('click', function() {
        var file_data = $('#c_file').prop('files')[0];
        var form_data = new FormData();
        form_data.append('c_file', file_data);
        form_data.append('c_title', $('#c_title').val());
        form_data.append('c_url', $('#c_url').val());
        console.log(form_data);
        axios({
                method: 'POST',
                url: '/admin/add_courses',
                responseType: false,
                data: form_data
            })
            .then((response) => {
                console.log(response)
            });
    });

    // add events

    $('#add_event').on('click', function() {
        var file_data = $('#e_file').prop('files');
        var form_data = new FormData();
        for (let i = 0; i < file_data.length; i++) {
            form_data.append('e_files', file_data[i]);
        }
        form_data.append('e_title', $('#e_title').val());
        form_data.append('e_url', $('#e_url').val());
        // console.log(file_data.length);
        axios({
                method: 'POST',
                url: '/admin/add_event',
                responseType: false,
                data: form_data
            })
            .then((response) => {
                console.log(response)
            });
    });

})

function checkPicFun() {
    let reviewPic = document.getElementsByName('uploadPicReview')
    let r_file = document.getElementById('r_file')
    if (reviewPic[0].checked) {
        r_file.disabled = false;
    }
    if (reviewPic[1].checked) {
        r_file.disabled = true;
    }
}