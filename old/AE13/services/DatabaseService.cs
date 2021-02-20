using System.Threading.Tasks;
using Npgsql;

namespace AE13.Services
{
  public class DatabaseService {
    public NpgsqlConnection ConnectionPool;
    public DatabaseService() {
      // Don't try to await here, it'll brick the compiler
      this.InitializeConnection();
    }

    public async Task InitializeConnection() {
      var connString = "Host=localhost;Username=postgres;Password=898asa43sdfas9d244ses;Database=postgres;Port=5555";
      await using var conn = new NpgsqlConnection(connString);
      await conn.OpenAsync();
      this.ConnectionPool = conn;
    }
  }

  // Defining our database enums and classes
  public enum member_type {Pup,Pack,Dire}
  public enum claim_type {Ore,Story,Anomaly,PI}
  public enum claim_status {Pending,Approved,Rejected}
  
  public class member {
    public string member_id;
    public string name;
    public member_type type;
    public bool officer;
  }

  public class claim {
    public string member_id;
    public claim_type type;
    public float amount;
    public float timestamp;
    public claim_status status;
  }
}