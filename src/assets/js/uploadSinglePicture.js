$(".upload-action").click(function() {
    $(".upload-input").click();
    $(".upload-input").change(function() {
        preview(this, $('.preview-box'));
    });
});

function preview(fileInput, previewBox) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.objectFit = 'cover';
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            previewBox.empty();
            previewBox.append(img);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        previewBox.empty();
    }
}
