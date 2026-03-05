const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 sm:h-56 bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>

        {/* Price */}
        <div className="h-6 bg-gray-200 rounded mb-3 w-1/2"></div>

        {/* Location */}
        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>

        {/* Details */}
        <div className="flex gap-4 mb-5">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;