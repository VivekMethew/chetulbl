$(document).ready(function() {

    $('.event_option_disp ').hide()

    $('#add_employees').on('click', function() {
        axios({
                method: 'POST',
                url: '/admin/add_employees',
                responseType: 'application/json',
                data: {
                    emp_design: $('#emp_design').val(),
                    fname: $('#fname').val(),
                    lname: $('#lname').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val()
                }
            })
            .then((response) => {
                let data = response.data
                if (data.success) {
                    location.reload()
                    document.getElementById('messageTextEmployees').innerHTML = data.message;
                    document.getElementById('messageTextEmployees').className = 'text-success';
                } else {
                    document.getElementById('messageTextEmployees').innerHTML = data.message;
                    document.getElementById('messageTextEmployees').className = 'text-danger';
                }
            });
    });

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
                    location.reload()
                    document.getElementById('messageText').innerHTML = data.message;
                    document.getElementById('messageText').className = 'text-success';
                } else {
                    document.getElementById('messageText').innerHTML = data.message;
                    document.getElementById('messageText').className = 'text-danger';
                }
                // console.log(data.success)
            });
    });

    // add events
    $("input[name='event_notice']").on('click', () => {
        let event_notice = $("input[name='event_notice']")
        if (event_notice[0].checked) {
            document.getElementById('e_file').disabled = true;
            $('.event_option_disp ').hide()
        }
        if (event_notice[1].checked) {
            document.getElementById('e_file').disabled = false;
            $('.event_option_disp ').show()
        }
    })

    // Add Trainer
    $('#add_event').on('click', function() {
        var form_data = new FormData();
        let event_notice = $("input[name='event_notice']");
        if (event_notice[0].checked) {
            form_data.append('e_type', 'notice');
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
                    let data = response.data
                    if (data.success) {
                        location.reload()
                        document.getElementById('messageTextEvent').innerHTML = data.message;
                        document.getElementById('messageTextEvent').className = 'text-success';
                    } else {
                        document.getElementById('messageTextEvent').innerHTML = data.message;
                        document.getElementById('messageTextEvent').className = 'text-danger';
                    }
                    // console.log(response)
                });
        }
        if (event_notice[1].checked) {
            let file_data = $('#e_file').prop('files')
            let e_title = $('#e_title').val();
            let e_desc = $('#e_desc').val();
            let e_date = $('#e_date').val();
            let e_time = $('#e_time').val();
            // let e_day = $('#e_day').val();
            let addr = $('#e_addr').val();
            let city = $('#e_city').val();
            let state = $('#e_state').val();
            let pincode = $('#e_pincode').val();
            let e_vanue = JSON.stringify({ addr: addr, city: city, state: state, pincode: pincode });

            for (let i = 0; i < file_data.length; i++) {
                form_data.append('e_files', file_data[i])
            }
            form_data.append('e_type', 'event');
            form_data.append('e_title', e_title);
            form_data.append('e_desc', e_desc);
            form_data.append('e_date', e_date);
            form_data.append('e_time', e_time);
            form_data.append('e_day', 'e_day');
            form_data.append('e_vanue', e_vanue);
            axios({
                    method: 'POST',
                    url: '/admin/add_event',
                    responseType: false,
                    data: form_data
                })
                .then((response) => {
                    let data = response.data
                    if (data.success) {
                        location.reload()
                        document.getElementById('messageTextEvent').innerHTML = data.message;
                        document.getElementById('messageTextEvent').className = 'text-success';
                    } else {
                        document.getElementById('messageTextEvent').innerHTML = data.message;
                        document.getElementById('messageTextEvent').className = 'text-danger';
                    }
                });
        }
    });


    $("input[name='uploadPicReview']").on('click', () => {
        let uploadPicReview = $("input[name='uploadPicReview']")
        let r_file = document.getElementById('rv_file')
        if (uploadPicReview[0].checked) {
            r_file.disabled = false;
            // alert(false)
        }
        if (uploadPicReview[1].checked) {
            r_file.disabled = true;
            // alert(true)
        }
    })

    // Add Reviews
    $('#add_reviews').on('click', function() {
        var form_data = new FormData();
        let uploadPicReview = $("input[name='uploadPicReview']");
        if (uploadPicReview[1].checked) {
            form_data.append('u_type', $('#u_type').val());
            form_data.append('r_title', $('#r_title').val());
            form_data.append('r_desc', $('#r_desc').val());
            axios({
                    method: 'POST',
                    url: '/admin/add_review',
                    responseType: false,
                    data: form_data
                })
                .then((response) => {
                    let data = response.data
                    if (data.success) {
                        location.reload()
                        document.getElementById('messageTextReview').innerHTML = data.message;
                        document.getElementById('messageTextReview').className = 'text-success';
                    } else {
                        document.getElementById('messageTextReview').innerHTML = data.message;
                        document.getElementById('messageTextReview').className = 'text-danger';
                    }
                    console.log(response)
                });
        }
        if (uploadPicReview[0].checked) {
            let file_data = $('#rv_file').prop('files')
            let u_type = $('#u_type').val();
            let r_title = $('#r_title').val();
            let r_desc = $('#r_desc').val();
            for (let i = 0; i < file_data.length; i++) {
                form_data.append('r_files', file_data[i])
            }
            form_data.append('u_type', u_type);
            form_data.append('r_title', r_title);
            form_data.append('r_desc', r_desc);
            axios({
                    method: 'POST',
                    url: '/admin/add_review',
                    responseType: false,
                    data: form_data
                })
                .then((response) => {
                    let data = response.data
                    if (data.success) {
                        location.reload()
                        document.getElementById('messageTextReview').innerHTML = data.message;
                        document.getElementById('messageTextReview').className = 'text-success';
                    } else {
                        document.getElementById('messageTextReview').innerHTML = data.message;
                        document.getElementById('messageTextReview').className = 'text-danger';
                    }
                    // console.log(response)
                });
        }
    });

})

// Event & Notice delete and updated
function eEditFunc(id) {
    if (confirm("Edit")) {
        console.log('ok')
            // axios.delete(`/admin/event_notices/${id}`)
            //     .then(function(response) {
            //         console.log(response.data);
            //         location.reload()
            //     })
    }
}

function eDeleteFunc(id) {
    if (confirm("Are you sure deleted this item")) {
        axios.delete(`/admin/event_notices/${id}`)
            .then(function(response) {
                console.log(response.data);
                location.reload()
            })
    }
}

// Courses Delete and update

function cEditFunc(id) {
    if (confirm("Edit")) {
        // c_title
        // c_url
        // document.getElementById('add_courses_update').disabled = false
        console.log('id :', id)
    }
}

function cDeleteFunc(id) {
    if (confirm("Are you sure deleted this item")) {
        axios.delete(`/admin/courses/${id}`)
            .then(function(response) {
                console.log(response.data);
                location.reload()
            })
    }
}


// Employee Delete and update

function tEditFunc(id) {
    if (confirm("Edit")) {
        console.log('ok')
            // axios.delete(`/admin/event_notices/${id}`)
            //     .then(function(response) {
            //         console.log(response.data);
            //         location.reload()
            //     })
    }
}

function tDeleteFunc(id) {
    if (confirm("Are you sure deleted this item")) {
        axios.delete(`/admin/trainers/${id}`)
            .then(function(response) {
                console.log(response.data);
                location.reload()
            })
    }
}


// Reviews Delete and update

function rEditFunc(id) {
    if (confirm(id)) {
        console.log(id)
            // axios.delete(`/admin/event_notices/${id}`)
            //     .then(function(response) {
            //         console.log(response.data);
            //         location.reload()
            //     })
    }
}

function rDeleteFunc(id) {
    if (confirm("Are you sure deleted this item")) {
        axios.delete(`/admin/reviews/${id}`)
            .then(function(response) {
                console.log(response.data);
                location.reload()
            })
    }
}