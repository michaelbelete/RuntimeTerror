ClassicEditor
            .create(document.querySelector('#postArea'))
            .catch(error => {
                console.error(error);
            });

        $(function () {

            $("#rateYo").rateYo({
                starWidth: "30px",
                ratedFill: "#07a8e2",
                halfStar: true
            });

            $("#post-rate1").rateYo({
                rating: 4,
                starWidth: "20px",
                ratedFill: "#07a8e2",
                halfStar: true,
                readOnly: true,
            })

            $("#post-rate2").rateYo({
                rating: 4,
                starWidth: "20px",
                ratedFill: "#07a8e2",
                halfStar: true,
                readOnly: true,
            })
        });

        $(document).ready(function () {
            $('#header').load('includes/header.html')
            $('#books').select2();
        });