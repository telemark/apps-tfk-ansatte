App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource('avdelinger');
  this.resource('avdeling', {'path':'/avdelinger/:avdeling_id'}, function(){
    this.resource('kart');
  });
  this.resource('search', {'path':'/search/:query'})
  this.route('personvern');
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
  },
  actions:{
    doSearch: function(){
      var param = App.query;
      return jQuery.ajax({
        url: 'http://ws.t-fk.no/?resource=persons&search=fullname&string=' + param + '&format=json',
        dataType: 'jsonp',
        type: 'GET'
      }).then(function(json){
        return json.results;
      });
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
  model: function(params) {
    return jQuery.ajax({
      url: 'http://ws.t-fk.no/?resource=departments&search=departmentid&string=' + params.avdeling_id + '&format=json',
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