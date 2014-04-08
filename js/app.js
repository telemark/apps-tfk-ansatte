App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route('avdelinger');
  this.resource('avdeling', {'path':'/avdelinger/:avdeling_id'}, function(){
    this.route('kart');
  });
  this.route('search', {'path':'/search/:query'})
  this.route('personvern');
  this.route('ansatt', {'path':'/ansatt/:ansatt_id'});
});

App.ApplicationController = Ember.Controller.extend({
  search:'',
  actions:{
    doSearch:function(){
      var q = this.get('search');
      this.transitionToRoute('search', q);
    }
  }
});

App.SearchRoute = Ember.Route.extend({
  model: function(params){
    return jQuery.ajax({
      url: 'http://ws.t-fk.no/?resource=persons&search=fullname&string=' + params.query + '&format=json',
      dataType: 'jsonp',
      type: 'GET'
    }).then(function(json){
      return json.results;
    });
  }
})


App.AvdelingRoute = Ember.Route.extend({
  model: function (params) {

    var avdelingCall = jQuery.ajax({
        url: 'http://ws.t-fk.no/?resource=departments&search=departmentid&string=' + params.avdeling_id + '&format=json',
        dataType: 'jsonp',
        type: 'GET'
      }),
        ansatteCall = jQuery.ajax({
          url: 'http://ws.t-fk.no/?resource=persons&search=departmentid&string=' + params.avdeling_id + '&format=json',
          dataType: 'jsonp',
          type: 'GET'
        });

    return Ember.RSVP.Promise.all([avdelingCall,ansatteCall]).then(function(arr){
      var avdeling = arr[0].results[0],
          ansatte = arr[1].results;

      return {avdeling:avdeling, ansatte:ansatte};
    });

  }
});

App.AnsattRoute = Ember.Route.extend({
  model: function(params) {
    return jQuery.ajax({
      url: 'http://ws.t-fk.no/?resource=persons&search=personid&string=' + params.ansatt_id + '&format=json',
      dataType: 'jsonp',
      type: 'GET'
    }).then(function(json){
      return json.results[0];
    });
  }
});

App.AvdelingerRoute = Ember.Route.extend({
  model: function() {
    return jQuery.ajax({
      url: 'http://ws.t-fk.no/?resource=departments&search=all&format=json',
      dataType: 'jsonp',
      type: 'GET'
    }).then(function(json){
      return json.results;
    });
  }
});