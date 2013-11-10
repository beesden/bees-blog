var beesden = beesden || {}

// Use CKEditor for WYSIWYG Editors
beesden.ckInit = function() {
	var editors = document.querySelectorAll('.editor'),
		ckConfig = function() {}
		config.contentsCss = ['/styles.css'];
		config.docType = '<!DOCTYPE html>';
		config.forcePasteAsPlainText = true;
		config.tabSpaces = 4;
		config.baseHref = "../";
		config.height = 280;
		config.toolbar = [
			{ name: 'document',    items : [ 'Source' ] },
			{ name: 'tools',       items : [ 'Maximize', 'ShowBlocks','-','Cut','Copy','Paste'] },
			{ name: 'links',       items : [ 'NumberedList','BulletedList','-','Link','Unlink','-','Image','Table','SpecialChar' ] },
			{ name: 'paragraph',   items : [ 'JustifyLeft','JustifyCenter','JustifyRight'] },
			'/',
			{ name: 'colors',      items : [ 'TextColor','BGColor' ] },
			{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','Strike','-','RemoveFormat' ] },
			{ name: 'styles',      items : [ 'Format','Font','FontSize' ] }
		];
	};

	for (var i = 0; i < editors.length; i++) {
		console.log(i);
		CKEDITOR.replace(editors[i].name, ckConfig);
	};
}

document.addEventListener('DOMContentLoaded', function() {
	beesden.ckInit();
});