package com.order.service;

import com.order.entities.QReport;
import com.order.entities.Report;
import com.order.repository.ReportRepository;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Component;

@Component
public class ReportService extends CommonRepository<Report,Long, ReportRepository> {
  public ReportService(ReportRepository repo) {
    super(repo);
  }
  private final QReport Q = QReport.report;
  
  public String getSourceReportById(Long id){
      JPAQuery<Report> query = new JPAQuery<>(em);
      return query.select(Q.sourceReport).from(Q).where(Q.id.eq(id)).fetchFirst();
  }
}
