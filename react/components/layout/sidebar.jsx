/* 
 * Sidebar/Navigation - A side menu for navigation between different pages
 */
export const Sidebar = ({ items }) => {
    return (
      <div className="w-64 bg-gray-800 text-white p-4">
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">
              <a href={item.href} className="hover:text-blue-400">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };