$(document).ready(function() {

    $('.event_option_disp ').hide()

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
                let data = response.data
                if (data.success) {
                    document.getElementById('messageText').innerHTML = data.message;
                    document.getElementById('messageText').className = 'text-success';
                } else {
                    document.getElementById('messageText').innerHTML = data.message;
                    document.getElementById('messageText').className = 'text-danger';
                }
                console.log(data.success)

            });
    });

    // add events
    $("input[name='event_review']").on('click', () => {
        let event_review = $("input[name='event_review']")
        if (event_review[0].checked) {
            document.getElementById('e_title').value = "review";
            document.getElementById('e_title').disabled = true;
            $('.event_option_disp ').hide()
        }
        if (event_review[1].checked) {
            document.getElementById('e_title').value = "";
            document.getElementById('e_title').disabled = false;
            $('.event_option_disp ').show()
        }
    })

    // Add Trainer
    $('#add_event').on('click', function() {
        var form_data = new FormData();
        let event_review = $("input[name='event_review']");
        if (event_review[0].checked) {
            form_data.append('e_type', 'review');
            form_data.append('e_title', $('#e_title').val());
            form_data.append('e_desc', $('#e_desc').val());
            form_data.append('e_date', null);
            form_data.append('e_time', null);
            form_data.append('e_day', null);
            form_data.append('e_vanue', null);
            axios({
                    method: 'POST',
                    url: '/admin/add_event',
                    responseType: false,
                    data: form_data
                })
                .then((response) => {
                    console.log(response)
                });
        }
        if (event_review[1].checked) {
            alert('Something Wromg')
                // var file_data = $('#e_file').prop('files');
                // var form_data = new FormData();
                // for (let i = 0; i < file_data.length; i++) {
                //     form_data.append('e_files', file_data[i]);
                // }
                // form_data.append('e_title', $('#e_title').val());
                // form_data.append('e_url', $('#e_url').val());
                // // console.log(file_data.length);
                // axios({
                //         method: 'POST',
                //         url: '/admin/add_event',
                //         responseType: false,
                //         data: form_data
                //     })
                //     .then((response) => {
                //         console.log(response)
                //     });
        }
    });


    $("input[name='uploadPicReview']").on('click', () => {
        let uploadPicReview = $("input[name='uploadPicReview']")
        let r_file = document.getElementById('r_file')
        if (uploadPicReview[0].checked) {
            r_file.disabled = false;
        }
        if (uploadPicReview[1].checked) {
            r_file.disabled = true;
        }
    })




})