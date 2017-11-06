var showdown = new showdown.Converter();


$.get("https://raw.githubusercontent.com/triyuga/github-cms-content/master/bullets.md", function(data) {
	$('.bullets').html(showdown.makeHtml(data));
});


// $.get("https://raw.githubusercontent.com/triyuga/github-cms-content/master/hi.md", function(data) {
// 	$('.post').html(showdown.makeHtml(data));
// 	// if (isAdmin) {
// 		$('.post').append('<a href="https://github.com/triyuga/github-cms-content/edit/master/hi.md" target="_blank">Edit</a>');
// 	// }
// });


// // posts
var postsUrl = 'https://api.github.com/repos/triyuga/github-cms-content/contents/posts/';
var postsEditUrl = 'https://github.com/triyuga/github-cms-content/edit/master/posts/';
$.get(postsUrl, function(files) {
	files.forEach(function(file) {
		if (file.type === 'file') {
			$.get(postsUrl + file.name, function(post) {
				var content = window.atob(post.content);
				var _class = post.name.replace('.', '-');
				if (file.name.includes('.md')) {
					$('.posts').append('<div class="'+_class+'">' + showdown.makeHtml(content) + '</div>');
				}
				else if (file.name.includes('.html')) {
					$('.posts').append('<div class="'+_class+'">' + content + '</div>');
				}
				$('.'+_class).append('<a href="'+ postsEditUrl + file.name + '" target="_blank">Edit</a>');
			});
		}
	})
});