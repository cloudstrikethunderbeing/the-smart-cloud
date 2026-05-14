import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (visitCount : { var count : Nat }, clickCounts : Map.Map<Text, Nat>, selfId : Principal) {

  let ANALYTICS_ADMIN_PRINCIPALS : [Text] = [
    "edxi4-5w5kv-nlgup-pf75l-xc756-6ucld-bpr76-eyz3v-t2wpf-chawz-aae",
    "hjxba-6xyu5-nzkdy-t62ib-rlq5r-7cgtg-de4rm-x2xya-rlnzj-hwwhe-6qe",
  ];

  func isAnalyticsAdmin(caller : Principal) : Bool {
    for (p in ANALYTICS_ADMIN_PRINCIPALS.values()) {
      if (Principal.fromText(p) == caller) return true;
    };
    false
  };

  /// Increment the global visit counter. No auth required.
  public shared func trackVisit() : async () {
    visitCount.count += 1;
  };

  /// Increment the click counter for a given element ID. No auth required.
  public shared func trackClick(elementId : Text) : async () {
    let current = switch (clickCounts.get(elementId)) {
      case (?n) n;
      case null 0;
    };
    clickCounts.add(elementId, current + 1);
  };

  /// Return visit and click analytics — admin only.
  public shared query ({ caller }) func getAnalytics() : async { #ok : { visitCount : Nat; clickCounts : [(Text, Nat)] }; #err : Text } {
    if (not isAnalyticsAdmin(caller)) {
      return #err("NotAuthorized");
    };
    #ok({
      visitCount = visitCount.count;
      clickCounts = clickCounts.toArray();
    });
  };

  /// Return the canister's own principal ID as text. No auth required.
  public query func getCanisterId() : async Text {
    selfId.toText();
  };
};
