(function (blink) {
	'use strict';

	var PopTropicaStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	PopTropicaStyle.prototype = {
		bodyClassName: 'content_type_clase_poptropica',
		ckEditorStyles: {
			name: 'poptropica',
			styles: [

				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title bck-title1'} },
				{ name: 'Título 2', element: 'h4', attributes: { 'class': 'bck-title bck-title2'} },

				{ name: 'Lista ordenada1', element: 'ol', attributes: { 'class': 'bck-ol bck-ol1' } },


				{ name: 'Caja 1', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box1' } },


			]
		},

		init: function () {
			var parent = blink.theme.styles.basic.prototype;
			parent.init.call(this);
			this.addActivityTitle();
			if(window.esWeb) return;
			this.removeFinalSlide();
			this.handleScrollEnd();
			this.setTooltip();
			window.editar && this.configEditor();

			if ($('.navbar-bottom').length > 0) {
 				$('.navbar-bottom ol').wrapAll('<div id="bottom-navigator"></div>');
		 		var width = 0;
		 		$('.navbar-bottom li').each(function(i, elem){ width += $(elem).outerWidth(true); });
		 		$('.navbar-bottom ol').css('width', width * 1.1);
		 		var scroll = new IScroll('#bottom-navigator', {
		 			scrollX: true,
		 			scrollY: false,
		 			eventPassthrough: true
		 		});
		 		scroll.on('scrollEnd', this.handleScrollEnd);
		 		this.handleScrollEnd.call(scroll);
	 		}

		},

		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},


		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html().trim() + ' > ' + blink.courseInfo.unit;
			});
		},

		handleScrollEnd: function () {
 			$('#bottom-navigator')
 				.removeClass('show_left')
 				.removeClass('show_right');

 			if (this.x < 0) {
 				$('#bottom-navigator').addClass('show_left');
 			}
 			if (this.x > this.maxScrollX) {
 				$('#bottom-navigator').addClass('show_right');
 			}

 		},

		setTooltip: function () {},

		getEditorStyles: function () {
			return this.ckEditorStyles;
		}
	};

	PopTropicaStyle.prototype = _.extend({}, new blink.theme.styles.basic(), PopTropicaStyle.prototype);

	blink.theme.styles.poptropica = PopTropicaStyle;

})( blink );
