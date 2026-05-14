module {
  /// Email delivery status for a thesis access request
  public type EmailStatus = {
    #Queued;
    #Sent;
    #Failed;
  };

  /// A thesis access request submitted by a user
  public type ThesisRequest = {
    email : Text;
    comment : ?Text;
    timestamp : Int;
    emailStatus : EmailStatus;
  };
};
