import Types "../types/thesis";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type ThesisRequest = Types.ThesisRequest;

  /// Build a new request from email + optional comment. Status starts as #Queued.
  public func newRequest(email : Text, comment : ?Text) : ThesisRequest {
    {
      email;
      comment;
      timestamp = Time.now();
      emailStatus = #Queued;
    };
  };

  /// Check that an email looks minimally valid (non-empty, contains @)
  public func isValidEmail(email : Text) : Bool {
    if (email.size() == 0) return false;
    email.contains(#char '@')
  };

  /// Check whether this email has already requested access
  public func hasRequested(requests : List.List<ThesisRequest>, email : Text) : Bool {
    requests.find(func(r) { r.email == email }) != null
  };

  /// Update the emailStatus of a request matching the given email
  public func updateEmailStatus(requests : List.List<ThesisRequest>, email : Text, status : Types.EmailStatus) {
    requests.mapInPlace(
      func(req) {
        if (req.email == email) { { req with emailStatus = status } } else { req };
      }
    );
  };

  // --- Email copy constants ---

  public let pdfUrl : Text = "https://blob.caffeine.ai/the_utility_economy_compressed-019dd14f-d131-75f4-becc-6b24b625b1dc.pdf";

  public func email1Subject() : Text {
    "Access Granted — Smart Cloud Thesis"
  };

  public func email1Body() : Text {
    "<p>You requested access.</p>"
    # "<p>Start here:<br>"
    # "<a href=\"https://youtu.be/9JKD47GpPPw\">https://youtu.be/9JKD47GpPPw</a></p>"
    # "<p>If it clicks, continue:<br>"
    # "<a href=\"" # pdfUrl # "\">" # pdfUrl # "</a></p>"
  };

  public func email2Subject() : Text {
    "Most people miss this"
  };

  public func email2Body() : Text {
    "<p>This isn't theory.</p>"
    # "<p>It's already live.</p>"
    # "<p><a href=\"https://lite.bearlyhuman.ai\">https://lite.bearlyhuman.ai</a></p>"
  };

  public func email3Subject() : Text {
    "You're either early\u{2026} or you're not"
  };

  public func email3Body() : Text {
    "<p>You found something most people haven't seen yet.</p>"
    # "<p>The system is already running.</p>"
    # "<p>Learn it: <a href=\"https://jackbear.ai\">https://jackbear.ai</a><br>"
    # "Explore it: <a href=\"https://bearlyhuman.ai\">https://bearlyhuman.ai</a></p>"
  };
};
