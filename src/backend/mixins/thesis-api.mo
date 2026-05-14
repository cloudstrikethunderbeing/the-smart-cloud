import Types "../types/thesis";
import ThesisLib "../lib/thesis";
import List "mo:core/List";
import Timer "mo:core/Timer";
import Principal "mo:core/Principal";
import EmailClient "mo:caffeineai-email/emailClient";

mixin (requests : List.List<Types.ThesisRequest>) {

  // ───────────────────────────────────────────────────────────────────────────
  // ADMIN ALLOWLIST — Fixed compile-time list of authorized principal IDs.
  // To grant yourself admin access, replace the placeholder below with your
  // Internet Identity principal ID (the text form, e.g. "xxxxx-xxxxx-...-cai").
  //
  // HOW TO FIND YOUR PRINCIPAL ID:
  //   1. Open the app and log in with Internet Identity.
  //   2. Call getCallerPrincipal() (or check the browser console / dfx identity).
  //   3. Paste the principal text string as an entry in ADMIN_PRINCIPALS below.
  // ───────────────────────────────────────────────────────────────────────────
  let ADMIN_PRINCIPALS : [Text] = [
    "edxi4-5w5kv-nlgup-pf75l-xc756-6ucld-bpr76-eyz3v-t2wpf-chawz-aae",
    "hjxba-6xyu5-nzkdy-t62ib-rlq5r-7cgtg-de4rm-x2xya-rlnzj-hwwhe-6qe",
  ];

  func isAdmin(caller : Principal) : Bool {
    for (p in ADMIN_PRINCIPALS.values()) {
      if (Principal.fromText(p) == caller) return true;
    };
    false
  };

  /// Check whether the calling principal is an admin.
  /// Returns #ok(true) if authorized, #err("NotAuthorized") otherwise.
  public shared query ({ caller }) func checkAdminAccess() : async { #ok : Bool; #err : Text } {
    if (isAdmin(caller)) {
      #ok(true)
    } else {
      #err("NotAuthorized")
    }
  };

  /// Submit a thesis access request and trigger the 3-email drip sequence.
  /// Returns #ok("Request received") on success or #err(reason) on validation failure.
  public shared func requestThesisAccess(email : Text, comment : ?Text) : async { #ok : Text; #err : Text } {
    if (not ThesisLib.isValidEmail(email)) {
      return #err("Invalid email address");
    };

    if (ThesisLib.hasRequested(requests, email)) {
      return #err("This email has already requested access");
    };

    let req = ThesisLib.newRequest(email, comment);
    requests.add(req);

    // Email #1 — 3 minutes delay; updates emailStatus to #Sent or #Failed
    ignore Timer.setTimer<system>(
      #seconds(180),
      func() : async () {
        let result = await EmailClient.sendServiceEmail(
          "noreply",
          [email],
          ThesisLib.email1Subject(),
          ThesisLib.email1Body(),
        );
        let newStatus : Types.EmailStatus = switch (result) {
          case (#ok) { #Sent };
          case (#err(_)) { #Failed };
        };
        ThesisLib.updateEmailStatus(requests, email, newStatus);
      },
    );

    // Email #2 — 12 hours delay
    ignore Timer.setTimer<system>(
      #seconds(43200),
      func() : async () {
        ignore await EmailClient.sendServiceEmail(
          "noreply",
          [email],
          ThesisLib.email2Subject(),
          ThesisLib.email2Body(),
        );
      },
    );

    // Email #3 — 48 hours delay
    ignore Timer.setTimer<system>(
      #seconds(172800),
      func() : async () {
        ignore await EmailClient.sendServiceEmail(
          "noreply",
          [email],
          ThesisLib.email3Subject(),
          ThesisLib.email3Body(),
        );
      },
    );

    #ok("Request received")
  };

  /// Return all access requests — admin use only.
  /// Non-admin callers receive a #NotAuthorized error.
  public shared query ({ caller }) func getAccessRequests() : async { #ok : [Types.ThesisRequest]; #err : Text } {
    if (not isAdmin(caller)) {
      return #err("NotAuthorized");
    };
    #ok(requests.toArray())
  };
};
