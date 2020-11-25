package com.order.repository;

import com.order.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 9:06 AM ,November 25,2020
 */
public interface ReportRepository extends JpaRepository<Report,Long> , QuerydslPredicateExecutor<Report> {
}
