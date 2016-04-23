'use strict';
(function () {
  var selectedModules = {};
  var showSubmit = true;
  var showDownload = false;
  var showReset = false;
  var buildUrl;

  var toggleClass = function (el, class_) {
    if(el.hasClass(class_)){
      el.removeClass(class_)
    }
    else {
      el.addClass(class_)
    }
  }

  var pkgClickHandler = function (evt) {
    evt.preventDefault();
    var el = $(evt.target)
    var name = el.attr('data-package')
    if(selectedModules[name]) {
      selectedModules[name] = undefined
      if(_.pairs(selectedModules).length === 0) {
        showReset = false
      }
    } else {
      var css = el.attr('data-css')
      selectedModules[name] = css
      showReset = true
    }
    updateView()
  }

  var submitClickHandler = function (evt) {
    var file = _.reduce(selectedModules, function (file, module) {
      file += module
      return file
    }, '')

    buildUrl = URL.createObjectURL(new Blob([file], {type: 'text/css'}))
    showDownload = true;
    showSubmit = false;
    updateView()
  }

  var resetClickHandler = function (evt) {
    selectedModules = {}
    showSubmit = true
    showDownload = false
    showReset = false
    updateView()
  }

  var applyConditionalClass = function (el, condition, class_) {
    if((condition && !el.hasClass(class_)) ||
       (!condition && el.hasClass(class_))) {
      toggleClass(el, class_)
    }
  }

  var updateView = function() {
    var pkgs = $('.pkg')
    var download = $('.download')
    var submit = $('.submit')
    var reset = $('.reset')

    var numModules = _.pairs(selectedModules).length
    if(numModules === 0) {
      pkgs.each(function(p) {
        var pkg = $(p)
        pkg.removeClass('blue')
      })
      submit.text('Select Modules')
      submit.attr('disabled', true)
    } else {
      pkgs.each(function(p) {
        var pkg = $(p)
        applyConditionalClass(pkg, selectedModules[pkg.attr('data-package')], 'blue');
      })
      submit.text('Compile Selected Modules')
      submit.removeAttr('disabled')
    }

    applyConditionalClass(submit, showSubmit, 'db')
    applyConditionalClass(submit, !showSubmit, 'dn')

    applyConditionalClass(download, showDownload, 'dib')
    applyConditionalClass(download, !showDownload, 'dn')

    applyConditionalClass(reset, showReset, 'db')
    applyConditionalClass(reset, !showReset, 'dn')

    if(showDownload) {
      download.attr('href', buildUrl)
    }
  }

  $('.reset').on('click', resetClickHandler)

  $('.pkg').each(function(v) {
    $(v).on('click', pkgClickHandler)
  })

  $('.submit').on('click', submitClickHandler)

})()
