$(document).ready(function(){
  // draggable
  $( "#draggable" ).draggable();
 
  // drop
  $( "#draggable2" ).draggable();
  $( "#droppable" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass( "ui-state-highlight" )
        .find( "p" )
          .html( "Dropped!" );
    }
  });

  // sortable
  $( "#sortable" ).sortable();

  // accordion
  $( "#accordion" ).accordion({
    collapsible: true
  });

  // autocomplete
  var data = [
    "Apple",
    "Watermelon",
    "Orange",
    "Pear",
    "Cherry",
    "Strawberry",
    "Grape",
    "Mango",
    "Pomegranate",
    "Plum"
  ];
  $( "#f_name" ).autocomplete({
    source: data
  });

  // controlgroup
  $( ".controlgroup" ).controlgroup()
  $( ".controlgroup-vertical" ).controlgroup({
    "direction": "vertical"
  });

  // datepicker
  $( "#date" ).datepicker();

  // tabs
  $( "#tabs" ).tabs({
    beforeLoad: function( event, ui ) {
      ui.jqXHR.fail(function() {
        ui.panel.html(
          "Couldn't load this tab. We'll try to fix this as soon as possible. " +
          "If this wouldn't be a demo." );
      });
    }
  });
  // tooltip
  var tooltips = $( "[title]" ).tooltip({
    position: {
      my: "left top",
      at: "right+5 top-5",
      collision: "none"
    }
  });
  // $( "<button>" )
  //   .text( "Show help" )
  //   .button()
  //   .on( "click", function() {
  //     tooltips.tooltip( "open" );
  //   })
  //   .insertAfter( "form" );

  // add clsass
  $( "#button" ).on( "click", function() {
    $( "#effect" ).addClass( "newClass", 1000, callback );
  });

  function callback() {
    setTimeout(function() {
      $( "#effect" ).removeClass( "newClass" );
    }, 1500 );
  }

  // color animation
  var state = true;
  $( "#button2" ).on( "click", function() {
    if ( state ) {
      $( "#effect2" ).animate({
        backgroundColor: "#aa0000",
        color: "#fff",
        width: 500
      }, 1000 );
    } else {
      $( "#effect2" ).animate({
        backgroundColor: "#fff",
        color: "#000",
        width: 240
      }, 1000 );
    }
    state = !state;
  });

  if ( !$( "<canvas>" )[0].getContext ) {
    $( "<div>" ).text(
      "Your browser doesn't support canvas, which is required for this demo."
    ).appendTo( "#graphs" );
    return;
  }

  var i = 0,
    width = 100,
    height = 100;

  $.each( $.easing, function( name, impl ) {
    var graph = $( "<div>" ).addClass( "graph" ).appendTo( "#graphs" ),
      text = $( "<div>" ).text( ++i + ". " + name ).appendTo( graph ),
      wrap = $( "<div>" ).appendTo( graph ).css( 'overflow', 'hidden' ),
      canvas = $( "<canvas>" ).appendTo( wrap )[ 0 ];

    canvas.width = width;
    canvas.height = height;
    var drawHeight = height * 0.8,
      cradius = 10,
      ctx = canvas.getContext( "2d" );
    ctx.fillStyle = "black";

    // Draw background
    ctx.beginPath();
    ctx.moveTo( cradius, 0 );
    ctx.quadraticCurveTo( 0, 0, 0, cradius );
    ctx.lineTo( 0, height - cradius );
    ctx.quadraticCurveTo( 0, height, cradius, height );
    ctx.lineTo( width - cradius, height );
    ctx.quadraticCurveTo( width, height, width, height - cradius );
    ctx.lineTo( width, 0 );
    ctx.lineTo( cradius, 0 );
    ctx.fill();

    // Draw bottom line
    ctx.strokeStyle = "#555";
    ctx.beginPath();
    ctx.moveTo( width * 0.1, drawHeight + .5 );
    ctx.lineTo( width * 0.9, drawHeight + .5 );
    ctx.stroke();

    // Draw top line
    ctx.strokeStyle = "#555";
    ctx.beginPath();
    ctx.moveTo( width * 0.1, drawHeight * .3 - .5 );
    ctx.lineTo( width * 0.9, drawHeight * .3 - .5 );
    ctx.stroke();

    // Plot easing
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo( width * 0.1, drawHeight );
    $.each( new Array( width ), function( position ) {
      var state = position / width,
        val = impl( state, position, 0, 1, width );
      ctx.lineTo( position * 0.8 + width * 0.1,
        drawHeight - drawHeight * val * 0.7 );
    });
    ctx.stroke();

    // Animate on click
    graph.on( "click", function() {
      wrap
        .animate( { height: "hide" }, 2000, name )
        .delay( 800 )
        .animate( { height: "show" }, 2000, name );
    });

    graph.width( width ).height( height + text.height() + 10 );
  });

  


   
});



