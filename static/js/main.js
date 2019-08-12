'use strict';

// ------------------------------------
// HELPER FUNCTIONS TO TEST FOR SPECIFIC DISPLAY SIZE (RESPONSIVE HELPERS)
// ------------------------------------

function is_display_type(display_type) {
  return $('.display-type').css('content') == display_type || $('.display-type').css('content') == '"' + display_type + '"';
}
function not_display_type(display_type) {
  return $('.display-type').css('content') != display_type && $('.display-type').css('content') != '"' + display_type + '"';
}

// Initiate on click and on hover sub menu activation logic
function os_init_sub_menus() {

  // INIT MENU TO ACTIVATE ON HOVER
  var menu_timer;
  $('.menu-activated-on-hover').on('mouseenter', 'ul.main-menu > li.has-sub-menu', function () {
    var $elem = $(this);
    clearTimeout(menu_timer);
    $elem.closest('ul').addClass('has-active').find('> li').removeClass('active');
    $elem.addClass('active');
  });

  $('.menu-activated-on-hover').on('mouseleave', 'ul.main-menu > li.has-sub-menu', function () {
    var $elem = $(this);
    menu_timer = setTimeout(function () {
      $elem.removeClass('active').closest('ul').removeClass('has-active');
    }, 30);
  });

  // INIT MENU TO ACTIVATE ON CLICK
  $('.menu-activated-on-click').on('click', 'li.has-sub-menu > a', function (event) {
    var $elem = $(this).closest('li');
    if ($elem.hasClass('active')) {
      $elem.removeClass('active');
    } else {
      $elem.closest('ul').find('li.active').removeClass('active');
      $elem.addClass('active');
    }
    return false;
  });
}

$(function () {

  // MENU RELATED STUFF

  // INIT MOBILE MENU TRIGGER BUTTON
  $('.mobile-menu-trigger').on('click', function () {
    $('.menu-mobile .menu-and-user').slideToggle(200, 'swing');
    return false;
  });

  os_init_sub_menus();

  $('.content-panel-toggler, .content-panel-close, .content-panel-open').on('click', function () {
    $('.all-wrapper').toggleClass('content-panel-active');
  });


  $('.os-dropdown-trigger').on('mouseenter', function () {
    $(this).addClass('over');
  });
  $('.os-dropdown-trigger').on('mouseleave', function () {
    $(this).removeClass('over');
  });


  // Tasks foldable trigger
  $('.tasks-header-toggler').on('click', function () {
    $(this).closest('.tasks-section').find('.tasks-list-w').slideToggle(100);
    return false;
  });

  // Sidebar Sections foldable trigger
  $('.todo-sidebar-section-toggle').on('click', function () {
    $(this).closest('.todo-sidebar-section').find('.todo-sidebar-section-contents').slideToggle(100);
    return false;
  });

  // Sidebar Sub Sections foldable trigger
  $('.todo-sidebar-section-sub-section-toggler').on('click', function () {
    $(this).closest('.todo-sidebar-section-sub-section').find('.todo-sidebar-section-sub-section-content').slideToggle(100);
    return false;
  });

  // Drag init
  if ($('.tasks-list').length) {
    // INIT DRAG AND DROP FOR Todo Tasks
    var dragulaTasksObj = dragula($('.tasks-list').toArray(), {
      moves: function moves(el, container, handle) {
        return handle.classList.contains('drag-handle');
      }
    }).on('drag', function () {}).on('drop', function (el) {}).on('over', function (el, container) {
      $(container).closest('.tasks-list').addClass('over');
    }).on('out', function (el, container, source) {

      var new_pipeline_body = $(container).closest('.tasks-list');
      new_pipeline_body.removeClass('over');
      var old_pipeline_body = $(source).closest('.tasks-list');
    });
  }

  // #Fancy Selector
  $('.fs-selector-trigger').on('click', function () {
    $(this).closest('.fancy-selector-w').toggleClass('opened');
  });

});
