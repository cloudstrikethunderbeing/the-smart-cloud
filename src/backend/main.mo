import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Types "types/thesis";
import ThesisMixin "mixins/thesis-api";
import AnalyticsMixin "mixins/analytics-api";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";

actor Main {
  let accessControlState = AccessControl.initState();
  let requests = List.empty<Types.ThesisRequest>();
  let visitCount = { var count : Nat = 0 };
  let clickCounts = Map.empty<Text, Nat>();

  include MixinAuthorization(accessControlState);
  include ThesisMixin(requests);
  include AnalyticsMixin(visitCount, clickCounts, Principal.fromActor(Main));
};
