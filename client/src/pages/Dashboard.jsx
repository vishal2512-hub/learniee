import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Star,
  BookOpen,
  UserRound,
  LogOut,
  GraduationCap,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("All");
  const [subject, setSubject] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [rating, setRating] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [visibleCount, setVisibleCount] = useState(6);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);


  const grades = useMemo(() => {
    return [...new Set(courses.map((course) => course.grade))];
  }, [courses]);

  const subjects = useMemo(() => {
    return [...new Set(courses.map((course) => course.subject))];
  }, [courses]);


  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (search.trim()) {
      const value = search.toLowerCase().trim();

      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(value) ||
          course.subject.toLowerCase().includes(value)
      );
    }

    if (grade !== "All") {
      result = result.filter(
        (course) => course.grade === grade
      );
    }

    if (subject !== "All") {
      result = result.filter(
        (course) => course.subject === subject
      );
    }

    if (priceRange === "under1000") {
      result = result.filter(
        (course) => course.price < 1000
      );
    }

    if (priceRange === "1000-1500") {
      result = result.filter(
        (course) =>
          course.price >= 1000 &&
          course.price <= 1500
      );
    }

    if (priceRange === "1500-2000") {
      result = result.filter(
        (course) =>
          course.price > 1500 &&
          course.price <= 2000
      );
    }

    if (priceRange === "above2000") {
      result = result.filter(
        (course) => course.price > 2000
      );
    }

    if (rating !== "All") {
      result = result.filter(
        (course) =>
          course.teacherRating >= Number(rating)
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating-high") {
      result.sort(
        (a, b) =>
          b.teacherRating - a.teacherRating
      );
    }

    if (sortBy === "rating-low") {
      result.sort(
        (a, b) =>
          a.teacherRating - b.teacherRating
      );
    }

    return result;
  }, [
    courses,
    search,
    grade,
    subject,
    priceRange,
    rating,
    sortBy,
  ]);

  const visibleCourses = filteredCourses.slice(
    0,
    visibleCount
  );


  const clearFilters = () => {
    setSearch("");
    setGrade("All");
    setSubject("All");
    setPriceRange("All");
    setRating("All");
    setSortBy("default");
    setVisibleCount(6);
  };

  const handleLogout = async () => {
    await logout();
  };


  const getCourseIcon = (subject) => {
    if (subject === "Math") return "∑";
    if (subject === "Science") return "⚛";
    if (subject === "English") return "Aa";

    return "📚";
  };


  const activeFilters = [
    grade !== "All",
    subject !== "All",
    priceRange !== "All",
    rating !== "All",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50">


      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Learniee
              </h1>

              <p className="hidden text-[11px] text-slate-400 sm:block">
                Learn. Grow. Succeed.
              </p>
            </div>

          </div>

          {/* User */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name}
              </p>

              <p className="text-xs text-slate-400">
                Parent
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:flex"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* =====================================
          MAIN
      ===================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================
            HERO
        ===================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-8 text-white shadow-xl shadow-indigo-100 sm:px-10 sm:py-10">

          <div className="relative z-10 max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles size={14} />
              Personalized learning for your child
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {user?.name} 👋
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
              Discover courses designed to help your
              child learn confidently and build strong
              foundations.
            </p>

          </div>

          {/* Decorative */}

          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-white/5" />

        </section>

        {/* =====================================
            SEARCH
        ===================================== */}

        <section className="-mt-6 relative z-20">

          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50">

            <div className="flex items-center gap-3">

              <Search
                size={21}
                className="ml-2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(6);
                }}
                placeholder="Search by course name or subject..."
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              />

              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setVisibleCount(6);
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              )}

            </div>

          </div>

        </section>

        {/* =====================================
            FILTER HEADER
        ===================================== */}

        <section className="mt-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <BookOpen
                  size={20}
                  className="text-indigo-600"
                />

                <h2 className="text-xl font-bold text-slate-900">
                  Explore Courses
                </h2>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                Find the perfect course based on your
                child's needs.
              </p>

            </div>

            {/* Mobile Filter Button */}

            <button
              onClick={() =>
                setMobileFiltersOpen(true)
              }
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
            >
              <SlidersHorizontal size={17} />

              Filters

              {activeFilters > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[11px] text-white">
                  {activeFilters}
                </span>
              )}
            </button>

          </div>

        </section>

        {/* =====================================
            DESKTOP FILTERS
        ===================================== */}

        <section className="mt-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block">

          <div className="grid grid-cols-5 gap-3">

            {/* Grade */}

            <FilterSelect
              value={grade}
              onChange={(value) => {
                setGrade(value);
                setVisibleCount(6);
              }}
              icon={<GraduationCap size={16} />}
              options={[
                { value: "All", label: "All Grades" },
                ...grades.map((item) => ({
                  value: item,
                  label: item,
                })),
              ]}
            />

            {/* Subject */}

            <FilterSelect
              value={subject}
              onChange={(value) => {
                setSubject(value);
                setVisibleCount(6);
              }}
              icon={<BookOpen size={16} />}
              options={[
                {
                  value: "All",
                  label: "All Subjects",
                },
                ...subjects.map((item) => ({
                  value: item,
                  label: item,
                })),
              ]}
            />

            {/* Price */}

            <FilterSelect
              value={priceRange}
              onChange={(value) => {
                setPriceRange(value);
                setVisibleCount(6);
              }}
              options={[
                {
                  value: "All",
                  label: "All Prices",
                },
                {
                  value: "under1000",
                  label: "Under ₹1,000",
                },
                {
                  value: "1000-1500",
                  label: "₹1,000 – ₹1,500",
                },
                {
                  value: "1500-2000",
                  label: "₹1,500 – ₹2,000",
                },
                {
                  value: "above2000",
                  label: "Above ₹2,000",
                },
              ]}
            />

            {/* Rating */}

            <FilterSelect
              value={rating}
              onChange={(value) => {
                setRating(value);
                setVisibleCount(6);
              }}
              icon={<Star size={16} />}
              options={[
                {
                  value: "All",
                  label: "Any Rating",
                },
                {
                  value: "4.5",
                  label: "4.5+ Rating",
                },
                {
                  value: "4",
                  label: "4.0+ Rating",
                },
                {
                  value: "3.5",
                  label: "3.5+ Rating",
                },
                {
                  value: "3",
                  label: "3.0+ Rating",
                },
              ]}
            />

            {/* Sort */}

            <FilterSelect
              value={sortBy}
              onChange={(value) => {
                setSortBy(value);
                setVisibleCount(6);
              }}
              icon={<ArrowUpDown size={16} />}
              options={[
                {
                  value: "default",
                  label: "Sort by",
                },
                {
                  value: "price-low",
                  label: "Price: Low to High",
                },
                {
                  value: "price-high",
                  label: "Price: High to Low",
                },
                {
                  value: "rating-high",
                  label: "Rating: High to Low",
                },
                {
                  value: "rating-low",
                  label: "Rating: Low to High",
                },
              ]}
            />

          </div>

          {activeFilters > 0 && (
            <button
              onClick={clearFilters}
              className="mt-3 flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <RotateCcw size={13} />
              Clear all filters
            </button>
          )}

        </section>

        {/* =====================================
            RESULTS HEADER
        ===================================== */}

        <section className="mt-7 flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1
                ? "course"
                : "courses"}{" "}
              found
            </p>
          </div>

          {activeFilters > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-indigo-600 hover:underline lg:hidden"
            >
              Clear filters
            </button>
          )}

        </section>

        {/* =====================================
            COURSE GRID
        ===================================== */}

        <section className="mt-4">

          {loadingCourses ? (

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3, 4, 5, 6].map((item) => (
                <CourseSkeleton key={item} />
              ))}

            </div>

          ) : filteredCourses.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search size={24} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No courses found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                We couldn't find any courses matching
                your search and filters. Try adjusting
                your selections.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {visibleCourses.map((course) => (

                  <CourseCard
                    key={course.id}
                    course={course}
                    getCourseIcon={getCourseIcon}
                  />

                ))}

              </div>

              {/* Load More */}

              {visibleCount <
                filteredCourses.length && (

                <div className="mt-8 flex justify-center">

                  <button
                    onClick={() =>
                      setVisibleCount(
                        (previous) =>
                          previous + 6
                      )
                    }
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    Load More Courses
                  </button>

                </div>

              )}

            </>

          )}

        </section>

      </main>

      {/* =====================================
          MOBILE FILTER DRAWER
      ===================================== */}

      {mobileFiltersOpen && (

        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 shadow-2xl">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Filters
                </h3>

                <p className="text-xs text-slate-500">
                  Refine your course search
                </p>

              </div>

              <button
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="rounded-full bg-slate-100 p-2 text-slate-500"
              >
                <X size={18} />
              </button>

            </div>

            <div className="space-y-4">

              <MobileFilter
                label="Grade"
                value={grade}
                onChange={(value) => {
                  setGrade(value);
                  setVisibleCount(6);
                }}
                options={[
                  { value: "All", label: "All Grades" },
                  ...grades.map((item) => ({
                    value: item,
                    label: item,
                  })),
                ]}
              />

              <MobileFilter
                label="Subject"
                value={subject}
                onChange={(value) => {
                  setSubject(value);
                  setVisibleCount(6);
                }}
                options={[
                  {
                    value: "All",
                    label: "All Subjects",
                  },
                  ...subjects.map((item) => ({
                    value: item,
                    label: item,
                  })),
                ]}
              />

              <MobileFilter
                label="Price"
                value={priceRange}
                onChange={(value) => {
                  setPriceRange(value);
                  setVisibleCount(6);
                }}
                options={[
                  {
                    value: "All",
                    label: "All Prices",
                  },
                  {
                    value: "under1000",
                    label: "Under ₹1,000",
                  },
                  {
                    value: "1000-1500",
                    label: "₹1,000 – ₹1,500",
                  },
                  {
                    value: "1500-2000",
                    label: "₹1,500 – ₹2,000",
                  },
                  {
                    value: "above2000",
                    label: "Above ₹2,000",
                  },
                ]}
              />

              <MobileFilter
                label="Teacher Rating"
                value={rating}
                onChange={(value) => {
                  setRating(value);
                  setVisibleCount(6);
                }}
                options={[
                  {
                    value: "All",
                    label: "Any Rating",
                  },
                  {
                    value: "4.5",
                    label: "4.5+ Rating",
                  },
                  {
                    value: "4",
                    label: "4.0+ Rating",
                  },
                  {
                    value: "3.5",
                    label: "3.5+ Rating",
                  },
                ]}
              />

              <MobileFilter
                label="Sort"
                value={sortBy}
                onChange={(value) => {
                  setSortBy(value);
                  setVisibleCount(6);
                }}
                options={[
                  {
                    value: "default",
                    label: "Sort by",
                  },
                  {
                    value: "price-low",
                    label: "Price: Low to High",
                  },
                  {
                    value: "price-high",
                    label: "Price: High to Low",
                  },
                  {
                    value: "rating-high",
                    label: "Rating: High to Low",
                  },
                  {
                    value: "rating-low",
                    label: "Rating: Low to High",
                  },
                ]}
              />

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={clearFilters}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700"
              >
                Reset
              </button>

              <button
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white"
              >
                Show {filteredCourses.length} Courses
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

/* ==========================================
   COURSE CARD
========================================== */

const CourseCard = ({ course, getCourseIcon }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/40">

      {/* Course Header */}

      <div className="relative flex h-36 items-center justify-center bg-indigo-50">

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
          {course.subject}
        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-indigo-600 shadow-md">
          {getCourseIcon(course.subject)}
        </div>

      </div>

      {/* Content */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h3 className="line-clamp-2 text-base font-bold text-slate-900 transition group-hover:text-indigo-600">
              {course.title}
            </h3>

            <p className="mt-1 text-xs font-medium text-slate-400">
              {course.grade}
            </p>

          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600">
            <Star
              size={13}
              fill="currentColor"
            />
            {course.teacherRating}
          </div>

        </div>

        {/* Teacher */}

        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <UserRound size={15} />
          </div>

          <div>

            <p className="text-[11px] text-slate-400">
              Instructor
            </p>

            <p className="text-xs font-semibold text-slate-700">
              {course.teacherName}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-5 flex items-center justify-between">

          <div>

            <p className="text-[11px] text-slate-400">
              Course price
            </p>

            <p className="text-lg font-bold text-slate-900">
              ₹{course.price.toLocaleString("en-IN")}
            </p>

          </div>

          <button className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700">
            View Course
          </button>

        </div>

      </div>

    </article>
  );
};

/* ==========================================
   DESKTOP FILTER
========================================== */

const FilterSelect = ({
  value,
  onChange,
  options,
  icon,
}) => {
  return (
    <div className="relative">

      {icon && (
        <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className={`w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pr-9 text-sm font-medium text-slate-700 outline-none transition hover:border-indigo-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 ${
          icon ? "pl-9" : "pl-3"
        }`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

    </div>
  );
};

/* ==========================================
   MOBILE FILTER
========================================== */

const MobileFilter = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-semibold text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 outline-none"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};


const CourseSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      <div className="h-36 animate-pulse bg-slate-200" />

      <div className="space-y-4 p-5">

        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />

        <div className="h-10 animate-pulse rounded bg-slate-100" />

        <div className="h-10 animate-pulse rounded bg-slate-100" />

      </div>

    </div>
  );
};

export default Dashboard;