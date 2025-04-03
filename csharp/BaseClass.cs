// =====================================================
// 🏗️ SKELETT OCH BASKLASSER FÖR EN MODERN .NET-APPLIKATION
// =====================================================

// 🔹 1. Basklass för entiteter
// Denna klass fungerar som en grundläggande mall för entiteter.
// Den innehåller egenskaper som används av alla entiteter i systemet.
public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

// 🔹 2. Repository-mönster
// Gränssnitt för generiska dataåtkomstmetoder.
public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
}

// 🔹 3. Service-lager
// Basklass för tjänster som hanterar affärslogik och interagerar med repository-klasser.
public abstract class BaseService<T> where T : BaseEntity
{
    protected readonly IRepository<T> _repository;

    public BaseService(IRepository<T> repository)
    {
        _repository = repository;
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync() => await _repository.GetAllAsync();
    public virtual async Task<T?> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);
}

// 🔹 4. Event-driven arkitektur
// Grundläggande klass för att representera händelser i systemet.
public abstract class EventBase
{
    public DateTime Timestamp { get; } = DateTime.UtcNow;
}

// 🔹 5. Logger och felhantering
// En enkel tjänst för att hantera loggning och felmeddelanden.
public interface ILoggerService
{
    void LogInfo(string message);
    void LogError(string message, Exception ex);
}

public class ConsoleLoggerService : ILoggerService
{
    public void LogInfo(string message) => Console.WriteLine($"INFO: {message}");
    public void LogError(string message, Exception ex) => Console.WriteLine($"ERROR: {message} - {ex.Message}");
}

// 🔹 6. DTO (Data Transfer Object)
// Klass för att överföra data mellan olika delar av systemet.
public class EntityDto
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
}

// 🔹 7. Factory Pattern
// Klass som skapar instanser av entiteter via fabriksmönster.
public interface IEntityFactory<T> where T : BaseEntity, new()
{
    T CreateEntity();
}

public class EntityFactory<T> : IEntityFactory<T> where T : BaseEntity, new()
{
    public T CreateEntity() => new T();
}

// 🔹 8. Dependency Injection via .NET Core
// Extension-metoder för att registrera tjänster i .NET:s DI-container.
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped(typeof(BaseService<>), typeof(ServiceImplementation<>));
        return services;
    }
}

// 🔹 9. Unit of Work-patternet
// Ger bättre hantering av databastransaktioner.
public interface IUnitOfWork : IDisposable
{
    IRepository<T> Repository<T>() where T : BaseEntity;
    Task<int> SaveChangesAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly DbContext _context;

    public UnitOfWork(DbContext context)
    {
        _context = context;
    }

    public IRepository<T> Repository<T>() where T : BaseEntity
    {
        return new Repository<T>(_context);
    }

    public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();

    public void Dispose() => _context.Dispose();
}

// 🔹 10. Entity Framework Core integration
// Databaskontext och repository-implementation med EF Core.
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<MyEntity> MyEntities { get; set; }
}

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public async Task<T?> GetByIdAsync(Guid id) => await _dbSet.FindAsync(id);
    public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();
    public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
    public async Task UpdateAsync(T entity) => _dbSet.Update(entity);
    public async Task DeleteAsync(Guid id)
    {
        var entity = await _dbSet.FindAsync(id);
        if (entity != null) _dbSet.Remove(entity);
    }
}

// 🔹 11. Controller och API via ASP.NET Core
// En enkel RESTful API-controller för att hantera entiteter.
[ApiController]
[Route("api/[controller]")]
public class MyEntityController : ControllerBase
{
    private readonly BaseService<MyEntity> _service;

    public MyEntityController(BaseService<MyEntity> service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var entity = await _service.GetByIdAsync(id);
        return entity != null ? Ok(entity) : NotFound();
    }
}

// 🔹 12. Medlingsmönster via Mediator
// För bättre separation av logik och controllers.
public class GetEntitiesQuery : IRequest<IEnumerable<MyEntity>> {}

public class GetEntitiesHandler : IRequestHandler<GetEntitiesQuery, IEnumerable<MyEntity>>
{
    private readonly IRepository<MyEntity> _repository;

    public GetEntitiesHandler(IRepository<MyEntity> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<MyEntity>> Handle(GetEntitiesQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetAllAsync();
    }
}

// 🔹 13. Testning med xUnit och Moq
// Enhetstester och integrationstester.
public class MyEntityTests
{
    [Fact]
    public void Should_CreateEntity_With_DefaultValues()
    {
        var entity = new MyEntity();
        Assert.NotEqual(Guid.Empty, entity.Id);
        Assert.InRange(entity.CreatedAt, DateTime.UtcNow.AddSeconds(-1), DateTime.UtcNow);
    }
}