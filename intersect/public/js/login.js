
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'public/js/lib'
});

requirejs(['x/x'], function(x) {

    console.log(x.query.id('title'));

});
